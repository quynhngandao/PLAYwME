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
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
