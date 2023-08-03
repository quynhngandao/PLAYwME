const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
