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
 router.get("/", async (req, res) => {
  try {
    // Default values: page 1, 50 animals per page, Minnesota
    const location = req.query.location || "MN";
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;

    /***** execute SEARCH QUERY *****/
    const response = await client.animal.search({ location, limit, page });

    /***** SUCCESS *****/
    console.log("server response from Petfinder API successful:", response.data);
    res.send(response.data);

    /***** ERROR *****/
  } catch (error) {
    console.log("no pet found on server side", error);
    res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    // Default values: page 1, 50 animals per page, Minnesota
    const location = req.query.location || "MN";
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;

    /***** execute SEARCH QUERY *****/
    const response = await client.animal.search({ location, limit, page });

    /***** SUCCESS *****/
    console.log("server response from Petfinder API successful:", response.data);
    res.send(response.data);

    /***** ERROR *****/
  } catch (error) {
    console.log("no pet found on server side", error);
    res.sendStatus(500);
  }
});


module.exports = router;
