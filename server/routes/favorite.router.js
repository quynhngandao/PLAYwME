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

  let sqlQuery = `SELECT "username", "user"."id" AS "user_id", ROW_TO_JSON("animal") AS "animal_details"
  FROM "user" 
  JOIN "favorite_animal" ON "favorite_animal"."user_id" = "user"."id"
  JOIN "animal" ON "animal"."id" = "favorite_animal"."animal_id"
  WHERE "user"."id" = $1
  GROUP BY "username",  "user"."id", "animal"."id";`;

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
  console.log("inside of /favorite req.body", req.body);
  const { id: petfinderId, name, age, breeds, photos, url } = req.body;
  const user_id = req.user.id;

  // First, execute the first INSERT statement to insert the new animal and retrieve its "id"
  const insertAnimalQuery = `
    INSERT INTO "animal" ("petfinder_id", "name", "age", "breeds", "photos", "url")
    SELECT $1, $2, $3, $4, $5, $6
    WHERE NOT EXISTS (
      SELECT 1 FROM "animal" WHERE "petfinder_id" = $1
    )
    RETURNING "id";
  `;

  // Execute the first INSERT statement to insert the new animal and retrieve its "id"
  pool.query(insertAnimalQuery, [petfinderId, name, age, breeds, photos, url])
    .then((result) => {
      const animalId = result.rows[0]?.id;

      if (!animalId) {
        // Handle the case when no new animal was inserted (animalId is undefined)
        throw new Error('Animal was not inserted.');
      }

      // Now, execute the second INSERT statement to insert the favorite animal
      const insertFavoriteAnimalQuery = `
        INSERT INTO "favorite_animal" ("user_id", "animal_id")
        VALUES ($1, $2);
      `;
      return pool.query(insertFavoriteAnimalQuery, [user_id, animalId]);
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

// /**
//  * GET SELECTED animal for the user who favorited the animal to display 
//  */
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
 * Delete an animal if it's something the logged in user added
 */


module.exports = router;
