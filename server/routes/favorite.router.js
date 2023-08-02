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
  const user_id = req.user.id; 

  let sqlQuery = `SELECT "username", "user"."id" AS "user_id", "animal"."id" AS "animal_id", "animal" AS "animal_details"
  FROM "user"
  JOIN "favorite_animal" ON "favorite_animal"."user_id" = "user"."id"
  JOIN "animal" ON "animal"."id" = "favorite_animal"."animal_id"
  WHERE "user"."id" = $1;`;

  pool
    .query(sqlQuery, [user_id])
    .then((result) => {
      res.send(result.rows);
      console.log("GET request from database: ", result.rows);
    })
    .catch((error) => {
      console.log("Error in GET from database: ", error);
      res.sendStatus(500);
    });
});

/**
 * POST an animal for the logged in user in database
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  const { id: petfinderId, name, age, breeds, photos, url } = req.body;
  const userId = req.user.id;

  // check if the animal already exists in the "animal" table
  const selectAnimalQuery = `
    SELECT "id" FROM "animal" WHERE "petfinder_id" = $1;
  `;

  pool.query(selectAnimalQuery, [petfinderId])
    .then((result) => {
      // if exists, use its "id" to insert into the "favorite_animal" table
      const animalId = result.rows.length > 0 ? result.rows[0].id : null;

      // then, execute the second INSERT statement to insert the favorite animal
      const insertFavoriteAnimalQuery = `
        INSERT INTO "favorite_animal" ("user_id", "animal_id")
        VALUES ($1, $2);
      `;

      return pool.query(insertFavoriteAnimalQuery, [userId, animalId]);
    })
    .then(() => {
      console.log('Favorite animal POST to database successfully');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error with favorite animal POST to database: ', error);
      res.sendStatus(500);
    });
});

/**
 * Delete an animal if it's something the logged in user added
 */


module.exports = router;
