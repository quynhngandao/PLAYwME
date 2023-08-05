const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET SELECTED animal for the user who favorited the animal to display
 */
//  router.get("/:id", /* rejectUnauthenticated, */ (req, res) => {

//   // Get the animalId from the logged in user
//   const animalId = req.params.id;

//   let sqlQuery = `SELECT "username", "user"."id" AS "user_id", ROW_TO_JSON("animal") AS "animal_details"
//   FROM "user"
//   JOIN "favorite_animal" ON "favorite_animal"."user_id" = "user"."id"
//   JOIN "animal" ON "animal"."id" = "favorite_animal"."animal_id"
//   WHERE "user"."id" = $1
//   GROUP BY "username",  "user"."id", "animal"."id";`;

//   pool
//     .query(sqlQuery, [animalId])
//     .then((result) => {
//       res.send(result.rows);
//       console.log("GET request from database: ", result.rows);
//     })
//     .catch((error) => {
//       console.log("Error in GET from database: ", error);
//       res.sendStatus(500);
//     });
// });

/**
 * GET logged-in user's request for animals to display
 */
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    // Get the user_id from the logged in user
    const userId = req.user.id;

    // Request details that includes user's info and their animals details
    let requestResult = `SELECT
  jsonb_build_object('first_name', "user"."first_name", 'last_name', "user"."last_name", 'email', "user"."email", 'playtime', "date_time") AS "user_info",
  array_agg(jsonb_build_object('animal', "animal")) AS "animals_info"
  FROM "animal"
  JOIN "animal_request" ON "animal_request"."animal_id" = "animal"."id"
  JOIN "request" ON "request"."id" = "animal_request"."request_id" 
  JOIN "user" ON "user"."id" = "request"."user_id"
  WHERE "request"."user_id" = $1 
  GROUP BY "user"."first_name", "user"."last_name", "date_time", "user"."email";`;

    /***** Execute QUERY *****/
    const result = await pool.query(requestResult, [userId]);

    res.send(result.rows);
    console.log("GET request for user request from database: ", result.rows);
  } catch (error) {
    // CATCH ERROR
    console.log("Error in GET request for user request from database: ", error);
    res.sendStatus(500);
  }
});

/**
 * POST logged-in user's request to database
 */
router.post("/", async (req, res) => {
  try {
    const { request: date_time, user_id } = req.body;
    const { animalRequest: request_id, animal_id } = req.body;
    const userId = req.user.id;

    /***** USER REQUEST CHECK QUERY (Check if the same "request" exists in the "request" table) *****/
    const checkExistingTimeQuery = `SELECT "id" FROM "request" WHERE "user_id" = $1 AND "date_time" = $2 ;`;

    /***** Execute CHECK QUERY *****/
    const requestCheckResult = await pool.query(checkExistingTimeQuery, [
      user_id,
      date_time,
    ]);

    // if request doesn't exist 
    if (!requestCheckResult.rows.length) {
      // first INSERT QUERY (insert into request table AND return the id)
      const insertRequestQuery = `
      INSERT INTO "request" ("user_id", "date_time")
      VALUES ($1, $2)
      RETURNING "id"; 
    `;

      /***** Execute USER REQUEST INSERT QUERY *****/
      const insertRequestResult = await pool.query(insertRequestQuery, [
        user_id,
        date_time,
      ]);
      // set newly user inserted request as request_id
      request_id = insertRequestResult.rows[0]?.id;
    } else {
      // set existing user request as request_id
      request_id = requestCheckResult.rows[0]?.id;
    }

    /***** ANIMAL REQUEST CHECK QUERY (Check if animal request already exist in "animal_request" table) *****/
    const checkExistingAnimalRequestQuery = `
        SELECT "id" FROM "animal_request" 
        WHERE "request_id" = $1 
        AND "animal_id" = $2
    `;

    /***** Execute ANIMAL REQUEST CHECK QUERY *****/
    const checkAnimalRequestResult = await pool.query(
      checkExistingAnimalRequestQuery,
      [userId, request_id, animal_id]
    );

    // If the animal request already exists, don't insert again
    if (checkAnimalRequestResult.rows.length > 0) {
      console.log("Animal request already exists for the user");
      // The return avoid headers errors
      return res.sendStatus(409);
    } else {
      // If the animal request does not exist, insert it
      const insertAnimalRequestQuery = `
        INSERT INTO "animal_request" ("request_id", "animal_id")
        VALUES ($1, $2) RETURNING "id";
      `;

      /***** Execute second INSERT QUERY *****/
      const insertAnimalRequestQueryResult = await pool.query(insertAnimalRequestQuery, [userId, request_id, animal_id]);
    }

    console.log('inseranimalrequestqueryresult', insertAnimalRequestQueryResult)
    
    console.log("Request POST to the '/request' database successfully");
    res.sendStatus(201);

    // CATCH ERROR
  } catch (error) {
    console.log("Error with request POST to '/request' database: ", error);
    res.sendStatus(500);
  }
});

module.exports = router;
