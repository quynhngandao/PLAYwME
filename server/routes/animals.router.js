const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const petfinder = require("@petfinder/petfinder-js");
const client = new petfinder.Client({
  apiKey: process.env.PETFINDER_API_KEY,
  secret: process.env.PETFINDER_SECRET,
});

// GET REQUEST FOR PEETFINDER API
router.get("/", (req, res) => {
  const limit = 30;
  const location = req.query.location || "MN";

  client.animal
    .search({ limit, location })
    .then((response) => {
      console.log("server response from animal api:", response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("no pet found on server side", err);
      res.sendStatus(500);
    });
});

module.exports = router;
