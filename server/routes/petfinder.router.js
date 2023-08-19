const express = require("express");
const router = express.Router();
const petfinder = require("@petfinder/petfinder-js");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const jwt_decode = require("jwt-decode");

/**********************************
 * CACHE ACCESS TOKEN FOR PETFINDER
 *********************************/
let cachedAccessToken = null;

// Create the Petfinder client instance
const client = new petfinder.Client({
  apiKey: process.env.PETFINDER_API_KEY,
  secret: process.env.PETFINDER_SECRET,
  token: cachedAccessToken, // Use cached token if available
});

// Function to handle authentication and caching of the access token
async function authenticateAndCacheToken() {
  var token = client.config.token;
  if (!token) {
    return;
  }
  var tokenData = jwt_decode(token);

  // console.log(tokenData);

  if (tokenData.exp * 1000 > Date.now()) {
    try {
      const response = await client.authenticate();
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }
}

/*********************************
 * DEFAULT RESPONSE FROM PETFINDER
 ********************************/
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const location = req.query.location || "MN";
    const limit = req.query.limit || 50;

    authenticateAndCacheToken();
    const response = await client.animal.search({ location, limit });

    console.log("server response from Petfinder API successful:");
    res.send(response.data);
  } catch (error) {
    console.log("Error fetching animals from Petfinder API:", error);
    res.sendStatus(500);
  }
});
/********************************
 * RABBIT RESPONSE FROM PETFINDER
 *******************************/
router.get("/rabbit", rejectUnauthenticated, async (req, res) => {
  try {
    const location = req.query.location || "MN";
    const limit = req.query.limit || 50;
    const type = req.query.type || "Rabbit";
    authenticateAndCacheToken();
    const response = await client.animal.search({
      location,
      limit,
      type,
    });

    console.log("server response for RABBIT from Petfinder API successful:");
    res.send(response.data);
  } catch (error) {
    console.log("Error fetching RABBIT from Petfinder API:", error);
    res.sendStatus(500);
  }
});

/*****************************
 * DOG RESPONSE FROM PETFINDER
 ****************************/
router.get("/dog", rejectUnauthenticated, async (req, res) => {
  try {
    const location = req.query.location || "MN";
    const limit = req.query.limit || 50;
    const type = req.query.type || "Dog";
    authenticateAndCacheToken();
    const response = await client.animal.search({
      location,
      limit,
      type,
    });

    console.log("server response for DOG from Petfinder API successful:");
    res.send(response.data);
  } catch (error) {
    console.log("Error fetching DOG from Petfinder API:", error);
    res.sendStatus(500);
  }
});

/*****************************
 * CAT RESPONSE FROM PETFINDER
 ****************************/
router.get("/cat", rejectUnauthenticated, async (req, res) => {
  try {
    const location = req.query.location || "MN";
    const limit = req.query.limit || 50;
    const type = req.query.type || "Cat";
    authenticateAndCacheToken();
    const response = await client.animal.search({
      location,
      limit,
      type,
    });

    console.log("server response for CAT from Petfinder API successful:");
    res.send(response.data);
  } catch (error) {
    console.log("Error fetching CAT from Petfinder API:", error);
    res.sendStatus(500);
  }
});

/******************************
 * BIRD RESPONSE FROM PETFINDER
 *****************************/
router.get("/bird", rejectUnauthenticated, async (req, res) => {
  try {
    const location = req.query.location || "MN";
    const limit = req.query.limit || 50;
    const type = req.query.type || "Bird";
    authenticateAndCacheToken();
    const response = await client.animal.search({
      location,
      limit,
      type,
    });

    console.log("server response for BIRD from Petfinder API successful:");
    res.send(response.data);
  } catch (error) {
    console.log("Error fetching BIRD from Petfinder API:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
