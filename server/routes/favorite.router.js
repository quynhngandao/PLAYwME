const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get favorited animals for a user to display
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  let sqlQuery = `SELECT * FROM "animal";`;

  pool
    .query(sqlQuery)
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
 * Add an animal for the logged in user in database
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("inside of /favorite req.body", req.body);
  let petfinderId = req.body.id;
  let name = req.body.name;
  let age = req.body.age;
  let breeds = req.body.breeds;
  let photos = req.body.photos;
  let url = req.body.url;
  
  let user = req.user.id;

 const queryText = `
 INSERT INTO "animal" ("user_ids", "petfinder_id", "name", "age", "breeds", "photos", "url")
 VALUES ($1, $2, $3, $4, $5, $6, $7)
 ON CONFLICT ("petfinder_id") DO UPDATE
 SET "user_ids" = "animal"."user_ids" || EXCLUDED.user_ids;
`;

  //redeclaring data fields (the user_id is an array)
  const queryParams = [[user], petfinderId, name, age, breeds, photos, url];
  //bringing in pool
  pool
    .query(queryText, queryParams)
    .then((result) => {
      console.log("POST animal from petfinder to database: ", result);
      res.send(201);
    })
    .catch((error) => {
      console.log(`error making query ${queryText} to database: `, error);
      res.sendStatus(500);
    });
});


/**
 * Delete an animal if it's something the logged in user added
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  let sqlID = req.params.id;
  let sqlUserId = req.user.id;

  // in animal table, user_ids is an array => need as integer
  let sqlQuery = `
  DELETE FROM "animal"
  WHERE "id"=$1 AND "animal"."user_ids" = ARRAY[CAST($2 AS INTEGER)];
  `;
//   let sqlQuery = `
//   DELETE FROM "animal"
//   WHERE "id"=$1 AND $2 = ANY("animal"."user_ids");
//  `;
  pool
    .query(sqlQuery, [sqlID, sqlUserId])
    .then((result) => {
      console.log("DELETE animal from database: ", result);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error to DELETE animal from database: ", error);
      res.sendStatus(500);
    });
});

module.exports = router;