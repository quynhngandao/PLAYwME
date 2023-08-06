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

/*****************************************************
 * GET logged-in user's request for animals to display
 ****************************************************/
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const user_id = req.user.id; // Get the user_id from the logged in user

    // GET REQUEST QUERY (Request details that includes user's info and their animals details)
    let requestResult = `
      SELECT jsonb_build_object('first_name', "user"."first_name", 'last_name', "user"."last_name", 'email', "user"."email", 'date_time', "date_time") AS "user_info",
      array_agg(jsonb_build_object('animal', "animal")) AS "animals_info"
      FROM "animal"
      JOIN "animal_request" ON "animal_request"."animal_id" = "animal"."id"
      JOIN "request" ON "request"."id" = "animal_request"."request_id" 
      JOIN "user" ON "user"."id" = "request"."user_id"
      WHERE "request"."user_id" = $1 
      GROUP BY "user"."first_name", "user"."last_name", "date_time", "user"."email";`;

    /***** Execute GET QUERY *****/
    const result = await pool.query(requestResult, [user_id]);

    /***** SUCCESS *****/
    console.log("GET request in '/request' from database sucessful");
    res.send(result.rows);

    /***** CATCH ERROR *****/
  } catch (error) {
    console.log("GET request in '/request' from database error: ", error);
    res.sendStatus(500);
  }
});

/*******************************
 * POST logged-in user's request
 ******************************/
router.post("/", rejectUnauthenticated, async (req, res) => {
  try {
    // req.body
    const date_time = req.body.date_time;
    const animal_ids = req.body.animal_id; // animal_id is now an array
    const user_id = req.user.id; // Get the user_id from the logged in user

    // Condition that checks if piece of data is missing or invalid
    if (!date_time || !animal_ids || animal_ids.length === 0) {
      return res
        .status(400)
        .json({ error: "date_time and at least one animal_id are required." });
    }

    // INSERT REQUEST QUERY (insert into "request" table and return id to get "request_id")
    const insertRequestQuery = `
      INSERT INTO "request" ("user_id", "date_time")
      VALUES ($1, $2)
      RETURNING id;
    `;

    /***** Execute INSERT QUERY *****/
    const insertRequestResult = await pool.query(insertRequestQuery, [
      user_id,
      date_time,
    ]);

    const request_id = insertRequestResult.rows[0].id;

    // INSERT ANIMAL REQUEST QUERY (insert into "animal_request" table with returned "request_id" and each "animal_id")
    const insertAnimalRequestQuery = `
      INSERT INTO "animal_request" ("request_id", "animal_id")
      VALUES ${animal_ids.map((animal_id) => `($1, ${animal_id})`).join(", ")};
    `;

    /***** Execute ANIMAL INSERT QUERY *****/
    const result = await pool.query(insertAnimalRequestQuery, [request_id]);

    /***** SUCCESS *****/
    console.log("POST request in '/request' to database successful");
    res.sendStatus(201);

    /***** CATCH ERROR *****/
  } catch (error) {
    console.log("POST request in '/request' to database error: ", error);
    res.sendStatus(500);
  }
});

/******************************
 * PUT logged-in user's request
 *****************************/
router.put("/:id", async (req, res) => {
  try {
    // Update a single request
    // req.params
    const requestToUpdate = req.params.id;
    // req.body
    const first_name = req.body.first_name;
    const email = req.body.email;
    const date_time = req.body.date_time;
    const dateObject = new Date(req.body.date_time);
    const formattedDateTime = dateObject.toISOString();
    /***** IMPORTANT date time format *****/

    // INSERT EDIT QUERY (update first_name and email in "user", update date_time in "request")
    const userEditQuery = `UPDATE "user" SET first_name = $1, email = $2 WHERE id = $3`;
    const date_timeEditQuery = `UPDATE "request" SET date_time = $1 WHERE id = $2`;

    /***** Execute EDIT QUERY *****/
    const result = await Promise.all([
      pool.query(userEditQuery, [first_name, email, requestToUpdate]),
      pool.query(date_timeEditQuery, [formattedDateTime, requestToUpdate]),
    ]);

    /***** SUCCESS *****/
    onsole.log("PUT request in '/request' to database successful");
    res.sendStatus(200);

    /***** CATCH ERROR *****/
  } catch (error) {
    console.log(`PUT request in '/request'to database error: `, error);
    res.sendStatus(500);
  }
});

module.exports = router;
