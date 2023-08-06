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
  jsonb_build_object('first_name', "user"."first_name", 'last_name', "user"."last_name", 'email', "user"."email", 'date_time', "date_time") AS "user_info",
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
// Assuming you already have the necessary imports and middleware set up

/**
 * POST logged-in user's request to database
 */
 router.post("/", rejectUnauthenticated, async (req, res) => {
  try {
    const date_time = req.body.date_time;
    const petfinder_id = req.body.petfinder_id; // Assuming you're sending the petfinder_id from the front-end

    // Check if date_time and petfinder_id are provided in the request body
    if (!date_time || !petfinder_id) {
      return res
        .status(400)
        .json({ error: "date_time and petfinder_id are required." });
    }

    // Fetch the animal_id from the database based on the provided petfinder_id
    const fetchAnimalIdQuery = `SELECT "id" FROM "animal" WHERE "petfinder_id" = $1;`;
    const animalResult = await pool.query(fetchAnimalIdQuery, [petfinder_id]);
    
    if (animalResult.rows.length === 0) {
      return res.status(404).json({ error: "Animal not found." });
    }

    const animal_id = animalResult.rows[0].id;

    const user_id = req.user.id; // Get the user_id from the logged-in user

    // USER REQUEST CHECK QUERY (Check if the same "request" exists in the "request" table)
    const checkExistingTimeQuery = `SELECT "id" FROM "request" WHERE "user_id" = $1 AND "date_time" = $2 ;`;

    // Execute CHECK QUERY
    const requestCheckResult = await pool.query(checkExistingTimeQuery, [
      user_id,
      date_time,
    ]);

    let request_id;
    // If request doesn't exist, insert into the "request" table
    if (!requestCheckResult.rows.length) {

      // INSERT QUERY for "request" table
      const insertRequestQuery = `
        INSERT INTO "request" ("user_id", "date_time")
        VALUES ($1, to_timestamp($2))
        RETURNING id;
      `;

      // Execute USER REQUEST INSERT QUERY
      const insertRequestResult = await pool.query(insertRequestQuery, [
        user_id,
        date_time,
      ]);
      // Set the newly inserted "request" ID as request_id
      request_id = insertRequestResult.rows[0].id;
    } else {
      // Set existing user request ID as request_id
      request_id = requestCheckResult.rows[0].id;
    }

    // ANIMAL REQUEST CHECK QUERY (Check if animal request already exists in "animal_request" table)
    const checkExistingAnimalRequestQuery = `
      SELECT "id" FROM "animal_request" 
      WHERE "request_id" = $1 
      AND "animal_id" = $2;
    `;

    // Execute ANIMAL REQUEST CHECK QUERY
    const checkAnimalRequestResult = await pool.query(
      checkExistingAnimalRequestQuery,
      [request_id, animal_id]
    );

    // If the animal request already exists, return a conflict status
    if (checkAnimalRequestResult.rows.length > 0) {
      console.log("Animal request already exists for the user");
      return res
        .status(409)
        .json({ error: "Animal request already exists for the user." });
    }

    // If the animal request does not exist, insert it into the "animal_request" table
    const insertAnimalRequestQuery = `
      INSERT INTO "animal_request" ("request_id", "animal_id")
      VALUES ($1, $2) RETURNING id;
    `;

    // Execute second INSERT QUERY
    const insertAnimalRequestResult = await pool.query(
      insertAnimalRequestQuery,
      [request_id, animal_id]
    );

    console.log("Request POST to the '/request' database successfully");
    res.sendStatus(201);
  } catch (error) {
    console.log("Error with request POST to '/request' database: ", error);
    res.sendStatus(500);
  }
});

module.exports = router;



/**
 * PUT logged-in user's request
 */
router.put("/:id", async (req, res) => {
  try {
    // Update this single request
    const idToUpdate = req.params.id;
    const date_time = req.body.date_time;

     /***** IMPORTANT date time format *****/

    const first_name = req.body.first_name;
    const email = req.body.email;
    const userEditQuery = `UPDATE "user" SET first_name = $1, email = $2 WHERE id = $3`;
    const date_timeEditQuery = `UPDATE "request" SET date_time = $1 WHERE id = $2`;

    // Execute the two update queries one after the other using Promise.all
    await Promise.all([
      pool.query(userEditQuery, [first_name, email, idToUpdate]),
      pool.query(date_timeEditQuery, [date_time, idToUpdate]),
    ]);

    res.sendStatus(200);
  } catch (error) {
    console.log(`Error making PUT database query for request`, error);
    res.sendStatus(500);
  }
});

module.exports = router;
