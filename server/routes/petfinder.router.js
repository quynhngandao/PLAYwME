const express = require("express");
const router = express.Router();
const petfinder = require("@petfinder/petfinder-js");
const client = new petfinder.Client({
  apiKey: process.env.PETFINDER_API_KEY,
  secret: process.env.PETFINDER_SECRET,
});

router.get("/", async (req, res) => {
  try {
    const location = req.query.location || "MN";
    const limit = req.query.limit || 30;
    const page = req.query.page || 1;

    const response = await client.animal.search({ location, limit, page });

    console.log("server response from Petfinder API successful:", response.data);
    res.send(response.data);
  } catch (error) {
    console.log("Error fetching animals from Petfinder API:", error);
    res.sendStatus(500);
  }
});

router.get("/rabbit", async (req, res) => {
  try {
    const location = req.query.location || "MN";
    const limit = req.query.limit || 20;
    const page = req.query.page || 1;
    const type = req.query.type || "Rabbit"

    const response = await client.animal.search({ location, limit, page, type });

    console.log("server response RABBIT from Petfinder API successful:", response.data);
    res.send(response.data);
  } catch (error) {
    console.log("Error fetching RABBIT from Petfinder API:", error);
    res.sendStatus(500);
  }
});
router.get("/dog", async (req, res) => {
  try {
    const location = req.query.location || "MN";
    const limit = req.query.limit || 15;
    const page = req.query.page || 1;
    const type = req.query.type || "Dog"

    const response = await client.animal.search({ location, limit, page, type });

    console.log("server response DOG from Petfinder API successful:", response.data);
    res.send(response.data);
  } catch (error) {
    console.log("Error fetching DOG from Petfinder API:", error);
    res.sendStatus(500);
  }
});

router.get("/cat", async (req, res) => {
  try {
    const location = req.query.location || "MN";
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const type = req.query.type || "Cat"

    const response = await client.animal.search({ location, limit, page, type });

    console.log("server response CAT from Petfinder API successful:", response.data);
    res.send(response.data);
  } catch (error) {
    console.log("Error fetching CAT from Petfinder API:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
