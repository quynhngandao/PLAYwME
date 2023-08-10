const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const moment = require("moment"); // date/time parsing
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/*****************************************************
 * GET logged-in user's request for animals to display
 ****************************************************/
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const user_id = req.user.id; // Get the user_id from the logged in user

    // GET REQUEST QUERY (Request details that includes user's info and their animals details)
    let requestResult = `
      SELECT jsonb_build_object('first_name', "user"."first_name", 'last_name', "user"."last_name", 'email', "user"."email", 'date_time', "date_time", 'request_id', "animal_request"."request_id") AS "user_info",
      array_agg(jsonb_build_object('animal', "animal")) AS "animals_info"
      FROM "animal"
      JOIN "animal_request" ON "animal_request"."animal_id" = "animal"."id"
      JOIN "request" ON "request"."id" = "animal_request"."request_id" 
      JOIN "user" ON "user"."id" = "request"."user_id"
      WHERE "request"."user_id" = $1 
      GROUP BY "user"."first_name", "user"."last_name", "date_time", "user"."email", "animal_request"."request_id"
      ORDER BY "request"."date_time" ASC;`;
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
        .json({ error: "date_time and at least one animal_id are required" });
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
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try {
    // Update a single request
    const requestToUpdate = req.params.id;
    const { first_name, last_name, email, date_time } = req.body;
    const user_id = req.user.id;

    /***** IMPORTANT date time format *****/
    const dateObject = moment(date_time);

    // Reformat date and time using moment
    const formattedDateTime = dateObject.format("MMMM D, YYYY h:mm A");
    console.log("Formatted DateTime:", formattedDateTime);

    console.group("User ID:", user_id);
    console.log("Request ID to update:", requestToUpdate);
    console.log("First Name:", first_name);
    console.log("Last Name:", last_name);
    console.log("Email:", email);
    console.groupEnd("");

    await connection.query("BEGIN"); // Start the SQL transaction

    /***** Execute EDIT QUERIES *****/
    // INSERT INTO "user" table
    const userUpdateQuery = `
      UPDATE "user"
      SET "first_name" = $1, "last_name" = $2, "email" = $3
      FROM "request"
      WHERE "user"."id" = $4;
`;
    const userUpdateResult = [first_name, last_name, email, user_id];
    // INSERT INTO "request" table
    const requestUpdateQuery = `
      UPDATE "request"
      SET "date_time" = $1
      WHERE "id" = $2;
`;
    const requestUpdateResult = [formattedDateTime, requestToUpdate];

    await connection.query(userUpdateQuery, userUpdateResult);
    await connection.query(requestUpdateQuery, requestUpdateResult);

    await connection.query("COMMIT"); // Commit the transaction

    /***** SUCCESS *****/
    console.log("PUT request in '/request' to database successful");
    res.sendStatus(200);
  } catch (error) {
    await connection.query("ROLLBACK"); // Rollback the transaction in case of an error
    console.log(`PUT request in '/request' to database error: `, error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the request." });
  } finally {
    connection.release(); // Release the connection back to the pool
  }
});

/*********************************
 * DELETE logged-in user's request
 ********************************/
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    // req.params
    let requestToDelete = req.params.id;
    let user_id = req.user.id; // Get the user_id from the logged in user

    // CHECK QUERY (checked if selected request belongs to the logged-in user)
    let checkRequestQuery = `
      SELECT *
      FROM "animal_request"
      WHERE "request_id" IN (
      SELECT "id"
      FROM "request"
      WHERE "id" = $1 AND "user_id" = $2
    );`;

    /***** Execute CHECK QUERY *****/
    const checkRequestQueryResult = await pool.query(checkRequestQuery, [
      requestToDelete,
      user_id,
    ]);

    // Condition that checks if selected request belong to logged-in user
    if (checkRequestQuery.rowCount === 0) {
      console.log("User does not have permission to delete ");
      res.sendStatus(403); // Forbidden status code
    } else {
      // DELETE QUERY (delete only if the request belongs to the logged-in user)
      let deleteRequestQuery = `
        DELETE FROM "animal_request"
        WHERE "request_id" IN (
        SELECT "id"
        FROM "request"
        WHERE "id" = $1 AND "user_id" = $2
      );`;

      /***** Execute DELETE QUERY *****/
      const result = await pool.query(deleteRequestQuery, [
        requestToDelete,
        user_id,
      ]);

      /***** SUCCESS *****/
      console.log("DELETE request in '/request' from database successful");
      res.sendStatus(200);
    }

    /***** CATCH ERROR *****/
  } catch (error) {
    console.log("DELETE request in '/request' from database: ", error);
    res.sendStatus(500);
  }
});

module.exports = router;
