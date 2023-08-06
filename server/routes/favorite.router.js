const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET favorited animals for the user who favorited the animal to display
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // Get the user_id from the logged in user
  const userId = req.user.id;

  // ROW_TO_JSON turns row in animal table into object
  let sqlQuery = `SELECT "username", "user"."id" AS "user_id", ROW_TO_JSON("animal") AS "animal_details"
  FROM "user" 
  JOIN "favorite_animal" ON "favorite_animal"."user_id" = "user"."id"
  JOIN "animal" ON "animal"."id" = "favorite_animal"."animal_id"
  WHERE "user"."id" = $1
  GROUP BY "username",  "user"."id", "animal"."id";`;

  pool
    .query(sqlQuery, [userId])
    .then((result) => {
      res.send(result.rows);
      console.log("GET request from '/favorite' database: ",=);
    })
    .catch((error) => {
      console.log("Error in GET from '/favorite' database: ", error);
      res.sendStatus(500);
    });
});

/**
 * POST an animal for the logged in user in database
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
  try {
    // creates alias petfinderId for the value of the id property from req.body
    // if req.body has a property called id, its value will be assigned to the variable petfinderId
    const {
      id: petfinderId,
      name,
      age,
      breeds,
      location,
      contact,
      photos,
      url,
    } = req.body;
    const userId = req.user.id;

    // IMPORTANT: Location is an object
    // Convert the location object to JSON string
    const locationJSON = JSON.stringify(location);

    /***** ANIMAL CHECK QUERY (Check if the "petfinder_id" exists in the "animal" table) *****/
    let animalId;
    const checkExistingAnimalQuery = `SELECT "id" FROM "animal" WHERE "petfinder_id" = $1;`;

    /***** Execute CHECK QUERY *****/
    const animalCheckResult = await pool.query(checkExistingAnimalQuery, [
      petfinderId,
    ]);

    // if petfinder_id in result row does not exsit
    if (!animalCheckResult.rows.length) {
      // first INSERT QUERY (insert into animal table AND return the id)
      const insertAnimalQuery = `
      INSERT INTO "animal" ("petfinder_id", "name", "age", "breeds", "location", "contact", "photos", "url")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING "id"; 
    `;

      /***** Execute ANIMAL INSERT QUERY *****/
      const insertAnimalResult = await pool.query(insertAnimalQuery, [
        petfinderId,
        name,
        age,
        breeds,
        locationJSON,
        contact,
        photos,
        url,
      ]);
      // set newly inserted animal as animalId
      animalId = insertAnimalResult.rows[0]?.id;
    } else {
      // set existing animal as animalId
      animalId = animalCheckResult.rows[0]?.id;
    }

    /*****  FAVORITE CHECK QUERY (Check if favorite animal exist in "favorite_animal" table) *****/
    const checkExistingFavoriteQuery = `
        SELECT "id" FROM "favorite_animal" 
        WHERE "user_id" = $1 
        AND "animal_id" = $2;
      `;

    /***** Execute FAVORITE ANIMAL CHECK QUERY *****/
    const checkFavoriteResult = await pool.query(checkExistingFavoriteQuery, [
      userId,
      animalId,
    ]);

    // If the favorite animal already exists, don't insert again
    if (checkFavoriteResult.rows.length > 0) {
      console.log("Favorite animal already exists for the user");
      // The return avoid headers errors
      return res.sendStatus(409);
    } else {
      // If the favorite animal does not exist, insert it
      const insertFavoriteAnimalQuery = `
        INSERT INTO "favorite_animal" ("user_id", "animal_id")
        VALUES ($1, $2) RETURNING "id";
      `;

      /***** Execute second INSERT QUERY *****/
      await pool.query(insertFavoriteAnimalQuery, [userId, animalId]);
    }
    console.log(
      "Favorite animal POST to the '/favorite' database successfully"
    );
    res.sendStatus(201);

    // CATCH ERROR
  } catch (error) {
    console.log(
      "Error with favorite animal POST to '/favorite' database: ",
      error
    );
    res.sendStatus(500);
  }
});

/**
 * Delete an animal if it's something the logged in user added
 */
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    // req.params and req.user
    let animalToDelete = req.params.id;
    let userId = req.user.id;

    console.log(animalToDelete, "animal to delete id");

    // CHECK QUERY (checked if selected animal belongs to the logged-in user)
    let checkAnimalQuery = `SELECT FROM "favorite_animal" WHERE "animal_id" = $1 AND "user_id" = $2;`;

    /***** Execute CHECK QUERY *****/
    const checkAnimalQueryResult = await pool.query(checkAnimalQuery, [
      animalToDelete,
      userId,
    ]);

    //  If rowCount is equal to 0, nothing was return from QUERY CHECK
    // => selected animal does not belong to the logged-in user
    /* (!checkAnimalQueryResult.rows.length) this can work but below is better */
    if (checkAnimalQueryResult.rowCount === 0) {
      console.log(
        "User does not have permission to delete the favorite animal"
      );
      res.sendStatus(403); // Forbidden status code
    } else {
      // DELETE QUERY (delete only if the animal belongs to the logged-in user)
      let deleteAnimalQuery = `DELETE FROM "favorite_animal" WHERE "animal_id" = $1 AND "user_id" = $2;`;

      /***** Execute DELETE QUERY *****/
      await pool.query(deleteAnimalQuery, [animalToDelete, userId]);
      console.log("DELETE animal from database: ");
      res.sendStatus(200);
    }

    // CATCH ERROR
  } catch (error) {
    console.log("Error to DELETE animal from database: ", error);
    res.sendStatus(500);
  }
});

module.exports = router;
