const Memcached = require("memcached");
const express = require("express");
const router = express.Router();
const petfinder = require("@petfinder/petfinder-js");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**********************************
 * CACHE ACCESS TOKEN FOR PETFINDER
 *********************************/

// Access the value of the CACHED_ACCESS_TOKEN environment variable
const cachedAccessToken = process.env.CACHED_ACCESS_TOKEN;

// Initialize Memcached client outside the function
const memcached = new Memcached({
  servers: process.env.MEMCACHIER_SERVERS,
  username: process.env.MEMCACHIER_USERNAME,
  password: process.env.MEMCACHIER_PASSWORD,
});

// Create the Petfinder client instance after caching the token
const client = new petfinder.Client({
  apiKey: process.env.PETFINDER_API_KEY,
  secret: process.env.PETFINDER_SECRET,
  token: cachedAccessToken, // Use cached token if available
});

// Function to handle authentication and caching of the access token
async function authenticateAndCacheToken() {
  if (!cachedAccessToken || Date.now() > tokenExpirationTime) {
    try {
      // Fetch the access token from Petfinder API
      const response = await client.authenticate();
      cachedAccessToken = response.data.access_token;
      tokenExpirationTime = Date.now() + response.data.expires_in * 1000;

   // Update the cached access token in environment
   process.env.CACHED_ACCESS_TOKEN = cachedAccessToken;

     // Cache the access token in Memcached
     await memcached.set("access_token", cachedAccessToken, response.data.expires_in);

     // Fetch and log the access token from cache
     memcached.get("access_token", (err, data) => {
       if (err) {
         console.error("Error fetching access token from cache:", err);
       } else {
         console.log("Access token from cache", data);
       }
     });

      // Set an interval to check and refresh the token if needed
      const tokenRefreshInterval = setInterval(
        authenticateAndCacheToken,
        3000000
      ); // Refresh 50 minutes

      // Clear the interval when the app is shutting down
      process.on("exit", () => {
        clearInterval(tokenRefreshInterval);
      }); // END OF ACCESS TOKEN CACHING
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
    const limit = req.query.limit || 50;
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
    const limit = req.query.limit || 50;
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
    const limit = req.query.limit || 50;
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
    const limit = req.query.limit || 50;
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
