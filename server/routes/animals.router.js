const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const petfinder = require("@petfinder/petfinder-js");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const client = new petfinder.Client({
  apiKey: process.env.PETFINDER_API_KEY,
  secret: process.env.PETFINDER_SECRET,
});

/*******************
 * GET PETFINDER API
 ******************/
router.get("/", rejectUnauthenticated, (req, res) => {
  const location = req.query.location || "MN";
  const limit = req.query.limit || 50;

  client.animal
    .search({ location, limit })
    .then((response) => {
      console.log("server response from animal api successful:", response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("no pet found on server side", err);
      res.sendStatus(500);
    });
});

module.exports = router;
