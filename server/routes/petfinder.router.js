const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
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
  let token = client.config.token;
  if (!token) {
    return;
  }

  let tokenData = jwt_decode(token); // decode token

  // if token expire in less than 30 min, reauthenticate
  if (tokenData.exp * 1000 - 30 * 60 * 1000 < Date.now()) {
    try {
      const response = await client.authenticate();

      // update token value
      token = client.config.token;

      // console.log(new Date(tokenData.exp * 1000).toString(), "Token expiration");
      // console.log(new Date(Date.now()).toString(), "Current DateTime");
      
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }
}

/*********************
 * UPDATE CACHED TOKEN
 ********************/
router.put("/update-token", async (req, res) => {
  try {
    await authenticateAndCacheToken(); // Wait for the authentication process to complete

    // set token value
    const token = client.config.token;

    const response = await pool.query(`UPDATE "token" SET "token" = $1`, [
      token,
    ]);

    console.log("Token inserted into the database");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating token:", error);
    res.sendStatus(500);
  }
});

/*********************************
 * DEFAULT RESPONSE FROM PETFINDER
 ********************************/
router.get("/", async (req, res) => {
  try {
    const location = req.query.location || "MN";
    const limit = req.query.limit || 50;

    // Get the token from the database
    const result = await pool.query(
      `SELECT "token" FROM "token" ORDER BY "id" DESC LIMIT 1;`
    );
    if (result.rows.length > 0) {
      const token = result.rows[0].token;

      // Fetch animals using the token
      const response = await client.animal.search({ location, limit }, token);
      console.log("Server response for ALL ANIMAL from Petfinder API successful:");
      res.send(response.data);
    } else {
      console.log("No cached token available in the database.");
      res.sendStatus(404); // Send a 404 status code if no token is found
    }
  } catch (error) {
    console.log("Error fetching ALL animals from Petfinder API:", error);
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
    
    // Get the token from the database
    const result = await pool.query(
      `SELECT "token" FROM "token" ORDER BY "id" DESC LIMIT 1;`
    );
    if (result.rows.length > 0) {
      const token = result.rows[0].token;

      // Fetch animals using the token
      const response = await client.animal.search({ location, limit, type }, token);
      console.log("Server response for RABBIT from Petfinder API successful:");
      res.send(response.data);
    } else {
      console.log("No cached token available in the database.");
      res.sendStatus(404); // Send a 404 status code if no token is found
    }
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
    
    // Get the token from the database
    const result = await pool.query(
      `SELECT "token" FROM "token" ORDER BY "id" DESC LIMIT 1;`
    );
    if (result.rows.length > 0) {
      const token = result.rows[0].token;

      // Fetch animals using the token
      const response = await client.animal.search({ location, limit, type }, token);
      console.log("Server response for DOG from Petfinder API successful:");
      res.send(response.data);
    } else {
      console.log("No cached token available in the database.");
      res.sendStatus(404); // Send a 404 status code if no token is found
    }
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
    
    // Get the token from the database
    const result = await pool.query(
      `SELECT "token" FROM "token" ORDER BY "id" DESC LIMIT 1;`
    );
    if (result.rows.length > 0) {
      const token = result.rows[0].token;

      // Fetch animals using the token
      const response = await client.animal.search({ location, limit, type }, token);
      console.log("Server response for CAT from Petfinder API successful:");
      res.send(response.data);
    } else {
      console.log("No cached token available in the database.");
      res.sendStatus(404); // Send a 404 status code if no token is found
    }
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
    
    // Get the token from the database
    const result = await pool.query(
      `SELECT "token" FROM "token" ORDER BY "id" DESC LIMIT 1;`
    );
    if (result.rows.length > 0) {
      const token = result.rows[0].token;

      // Fetch animals using the token
      const response = await client.animal.search({ location, limit, type }, token);
      console.log("Server response for BIRD from Petfinder API successful:");
      res.send(response.data);
    } else {
      console.log("No cached token available in the database.");
      res.sendStatus(404); // Send a 404 status code if no token is found
    }
  } catch (error) {
    console.log("Error fetching BIRD from Petfinder API:", error);
    res.sendStatus(500);
  }
});


module.exports = router;
