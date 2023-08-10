const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**************************************************
 * GET logged-in user's favorite animals to display
 *************************************************/
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const user_id = req.user.id; // Get the user_id from the logged in user

    // GET REQUEST QUERY (Request user's favanimal animals) ROW_TO_JSON turns row into object
    let sqlQuery = `
      SELECT "username", "user"."id" AS "user_id", ROW_TO_JSON("animal") AS "animal_details"
      FROM "user" 
      JOIN "favorite_animal" ON "favorite_animal"."user_id" = "user"."id"
      JOIN "animal" ON "animal"."id" = "favorite_animal"."animal_id"
      WHERE "user"."id" = $1
      GROUP BY "username",  "user"."id", "animal"."id";`;

    /***** Execute GET QUERY *****/
    const result = await pool.query(sqlQuery, [user_id]);

    /***** SUCCESS *****/
    res.send(result.rows);
    console.log("GET request from '/favorite' database successful: ");

    /***** ERROR *****/
  } catch (error) {
    console.log("Error in GET from '/favorite' database: ", error);
    res.sendStatus(500);
  }
});

/***************************************
 * POST logged-in user's favorite animal
 **************************************/
router.post("/", rejectUnauthenticated, async (req, res) => {
  try {
    // creates alias petfinderId for the value of the id property from req.body
    // if req.body has a property called id, its value will be assigned to the variable petfinderId
    const {
      id: petfinder_id,
      name,
      age,
      attribute,
      environment,
      breeds,
      type,
      size,
      organization_id,
      organization_animal_id,
      status,
      status_changed_at,
      published_at,
      location,
      contact,
      photos,
      url,
    } = req.body;
    const user_id = req.user.id; // Get the user_id from the logged in user

    /***** IMPORTANT *****/
    // Convert the location object to JSON string
    const locationJSON = JSON.stringify(location);

    // ANIMAL CHECK QUERY (Check if the "petfinder_id" exists in the "animal" table) *****/
    let animal_id;
    const checkExistingAnimalQuery = `SELECT "id" FROM "animal" WHERE "petfinder_id" = $1;`;

    /***** Execute CHECK QUERY *****/
    const animalCheckResult = await pool.query(checkExistingAnimalQuery, [
      petfinder_id,
    ]);

    // Condition that checks if petfinder_id in result row does not exsit
    if (!animalCheckResult.rows.length) {
      // First, INSERT QUERY (insert into animal table AND return the id)
      const insertAnimalQuery = `
        INSERT INTO "animal" ("petfinder_id", "name", "age", "attribute", "environment", "breeds", "type", "size", "organization_id", "organization_animal_id", "status", "status_changed_at", "published_at", "location", "contact", "photos", "url")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING "id"; 
    `;

      /***** Execute INSERT ANIMAL QUERY *****/
      const insertAnimalResult = await pool.query(insertAnimalQuery, [
        petfinder_id,
        name,
        age,
        attribute,
        environment,
        breeds,
        type,
        size,
        organization_id,
        organization_animal_id,
        status,
        status_changed_at,
        published_at,
        location,
        contact,
        photos,
        url
      ]);
      // set newly inserted animal as animalId
      animal_id = insertAnimalResult.rows[0]?.id;
    } else {
      // set existing animal as animalId
      animal_id = animalCheckResult.rows[0]?.id;
    }

    // FAVORITE ANIMAL CHECK QUERY (Check if favorite animal exist in "favorite_animal" table)
    const checkExistingFavoriteQuery = `
      SELECT "id" FROM "favorite_animal" 
      WHERE "user_id" = $1 
      AND "animal_id" = $2;
    `;

    /***** Execute FAVORITE ANIMAL CHECK QUERY *****/
    const checkFavoriteResult = await pool.query(checkExistingFavoriteQuery, [
      user_id,
      animal_id,
    ]);

    // If the favorite animal already exists, don't insert again
    if (checkFavoriteResult.rows.length > 0) {
      console.log("Favorite animal already exists for the user");
      return res.sendStatus(409); // The "return" avoid headers errors
    } else {
      // If the favorite animal does not exist, insert it
      const insertFavoriteAnimalQuery = `
        INSERT INTO "favorite_animal" ("user_id", "animal_id")
        VALUES ($1, $2) RETURNING "id";
      `;

      /***** Execute second INSERT QUERY *****/
      const result = await pool.query(insertFavoriteAnimalQuery, [
        user_id,
        animal_id,
      ]);
    }
    /***** SUCCESS *****/
    console.log("POST animal in '/favorite' to database successful");
    res.sendStatus(201);

    /***** CATCH ERROR *****/
  } catch (error) {
    console.log("POST animal in '/favorite' to database error: ", error);
    res.sendStatus(500);
  }
});

/****************************************
 * DELETE logged-in user's favorite animal
 ****************************************/
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    // req.params
    let animalToDelete = req.params.id;
    let user_id = req.user.id; // Get the user_id from the logged in user

    // CHECK QUERY (checked if selected animal belongs to the logged-in user)
    let checkAnimalQuery = `
      SELECT * FROM "favorite_animal" 
      WHERE "animal_id" = $1 AND "user_id" = $2;`;

    /***** Execute CHECK QUERY *****/
    const checkAnimalQueryResult = await pool.query(checkAnimalQuery, [
      animalToDelete,
      user_id,
    ]);

    // Condition that checks if selected animal belong to logged-in user
    if (checkAnimalQueryResult.rowCount === 0) {
      /* (!checkAnimalQueryResult.rows.length) this can work but rowCount is better */
      console.log("User does not have permission to delete ");
      res.sendStatus(403); // Forbidden status code
    } else {
      // DELETE QUERY (delete only if the animal belongs to the logged-in user)
      let deleteAnimalQuery = `
        DELETE FROM "favorite_animal" 
        WHERE "animal_id" = $1 AND "user_id" = $2;`;

      /***** Execute DELETE QUERY *****/
      const result = await pool.query(deleteAnimalQuery, [
        animalToDelete,
        user_id,
      ]);

      /***** SUCCESS *****/
      console.log("DELETE animal in '/favorite' from database successful");
      res.sendStatus(200);
    }

    /***** CATCH ERROR *****/
  } catch (error) {
    console.log("DELETE animal in '/favorite' from database: ", error);
    res.sendStatus(500);
  }
});

/******************************
 * PUT logged-in user's animal
 *****************************/
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    // Update a single request
    const requestToUpdate = req.params.id;
    const note = req.body.note;
    const user_id = req.user.id; // Get the user_id from the logged in user

    onsole.log("Request ID to update:", requestToUpdate);
    console.log("note:", note);

    // UPDATE "favorite_animal" table
    const animalEditQuery = `
       UPDATE "favorite_animal"
       SET "note" = $1
       WHERE "user"."id" = $2;
     `;

    /***** Execute EDIT QUERIES *****/
    await pool.query(animalEditQuery, [user_id, note]);

    /***** SUCCESS *****/
    console.log("PUT request in '/favorite' to database successful");
    res.sendStatus(200);
  } catch (error) {
    console.log(`PUT request in '/favorite' to database error: `, error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the request." });
  }
});

module.exports = router;
