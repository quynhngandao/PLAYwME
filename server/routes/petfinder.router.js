const express = require("express");
const router = express.Router();
const petfinder = require("@petfinder/petfinder-js");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**********************************
 * CACHE ACCESS TOKEN FOR PETFINDER
 *********************************/
// Create the Petfinder client instance
const client = new petfinder.Client({
  apiKey: process.env.PETFINDER_API_KEY,
  secret: process.env.PETFINDER_SECRET,
});

// Set an interval to check and refresh the token if needed
const tokenRefreshInterval = setInterval(async () => {
  try {
    await client.refresh();
    console.log('Token refreshed successfully.');
  } catch (error) {
    console.log('Error refreshing token:', error);
  }
}, 1800000); // Refresh every 30 minutes


// Clear the interval when the app is shutting down
process.on("exit", () => {
  clearInterval(tokenRefreshInterval);
});

/*********************************
 * DEFAULT RESPONSE FROM PETFINDER
 ********************************/
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const location = req.query.location || "MN";
    const limit = req.query.limit || 50;

    const response = await client.animal.search({ location, limit });

    console.log(
      "server response from Petfinder API successful:"
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
      "server response for DOG from Petfinder API successful:"
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
      "server response for CAT from Petfinder API successful:"
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
      "server response for BIRD from Petfinder API successful:"
    );
    res.send(response.data);
  } catch (error) {
    console.log("Error fetching BIRD from Petfinder API:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
