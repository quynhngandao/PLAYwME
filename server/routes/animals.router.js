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
// router.get("/", rejectUnauthenticated, async (req, res) => {
//   try {
//     const location = req.query.location || "MN";
//     const limit = req.query.limit || 30;
//     const totalPages = 10;

//     const results = [];

//     for (let page = 1; page <= totalPages; page++) {
//       const response = await client.animal.search({
//         location,
//         limit,
//         page,
//       });
//       results.push(...response.data);
//     }

//     console.log(
//       `Server response for across ${totalPages} pages successful.`
//     );
//     res.send(results);
//   } catch (err) {
//     console.log(`Error fetching results`, err);
//     res.sendStatus(500);
//   }
// });

router.get("/", rejectUnauthenticated, (req, res) => {
  const location = req.query.location || "MN";

  client.animal
    .search({ location })
    .then((response) => {
      console.log("server response from animal api successful:", response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("no pet found on server side", err);
      res.sendStatus(500);
    });
});

/*************
 * SEARCH DOG
 *************/
router.get("/search/:dog", rejectUnauthenticated, (req, res) => {
  const location = req.query.location || "MN";
  const type = req.query.type || "dog";
  const limit = req.query.limit || 30;

  const dog = req.params.dog;

  const dogSearch = dog ? dog : type;

  client.animal
    .search({ location, type: dogSearch, limit })
    .then((response) => {
      console.log(
        `Server response for ${dogSearch} successful:`,
        response.data
      );
      res.send(response.data);
    })
    .catch((err) => {
      console.log(`No ${dogSearch} found on the server side`, err);
      res.sendStatus(500);
    });
});

/*************
 * SEARCH CAT
 *************/
router.get("/search/:cat", rejectUnauthenticated, (req, res) => {
  const location = req.query.location || "MN";
  const type = req.query.types || "cat";
  const limit = req.query.limit || 30;

  const cat = req.params.cat;

  const catSearch = cat ? cat : type;

  client.animal
    .search({ location, type: catSearch, limit })
    .then((response) => {
      console.log(
        `Server response for ${catSearch} successful:`,
        response.data
      );
      res.send(response.data);
    })
    .catch((err) => {
      console.log(`No ${catSearch} found on the server side`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
