const express = require("express");
const router = express.Router();
const petfinder = require("@petfinder/petfinder-js");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**********************************
 * CACHE ACCESS TOKEN FOR PETFINDER 
 *********************************/
 let cachedAccessToken = null;
 // Function to handle authentication and caching of the access token
 async function authenticateAndCacheToken() {
   if (!cachedAccessToken) {
     try {
       const response = await client.authenticate();
       cachedAccessToken = response.data.access_token;
       console.log("Access token cached:", cachedAccessToken);
     } catch (error) {
       console.error("Authentication error:", error);
     }
   }
 }
 // Create the Petfinder client instance
const client = new petfinder.Client({
  apiKey: process.env.PETFINDER_API_KEY,
  secret: process.env.PETFINDER_SECRET,
  token: cachedAccessToken, // Use cached token if available
});
// Call the authentication function to cache the token
authenticateAndCacheToken();

/*********************************
 * DEFAULT RESPONSE FROM PETFINDER
 ********************************/
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const location = req.query.location || "MN";
    const limit = req.query.limit || 50;

    const response = await client.animal.search({ location, limit });

    console.log(
      "server response from Petfinder API successful:",
      response.data
    );
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
    const limit = req.query.limit || 30;
    const type = req.query.type || "Rabbit";

    const response = await client.animal.search({
      location,
      limit,
      type,
    });

    console.log(
      "server response for RABBIT from Petfinder API successful:",
      response.data
    );
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
    const limit = req.query.limit || 30;
    const type = req.query.type || "Dog";

    const response = await client.animal.search({
      location,
      limit,
      type,
    });

    console.log(
      "server response for DOG from Petfinder API successful:",
      response.data
    );
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
    const limit = req.query.limit || 30;
    const type = req.query.type || "Cat";

    const response = await client.animal.search({
      location,
      limit,
      type,
    });

    console.log(
      "server response for CAT from Petfinder API successful:",
      response.data
    );
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
    const limit = req.query.limit || 30;
    const type = req.query.type || "Bird";

    const response = await client.animal.search({
      location,
      limit,
      type,
    });

    console.log(
      "server response for BIRD from Petfinder API successful:",
      response.data
    );
    res.send(response.data);
  } catch (error) {
    console.log("Error fetching BIRD from Petfinder API:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
