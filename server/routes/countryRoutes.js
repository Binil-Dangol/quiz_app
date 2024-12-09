const express = require("express");
const Country = require("../models/Country");
const router = express.Router();

// Fetch all countries
router.get("/", async (req, res) => {
  try {
    const countries = await Country.find({});
    //console.log(countries);
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json({ message: "Error fetching countries", error: err });
  }
});

// Add new countries (optional for testing)
// router.post("/", async (req, res) => {
//   try {
//     const countries = req.body; // Expecting an array of country objects
//     const insertedCountries = await Country.insertMany(countries);
//     res.status(201).json({ message: "Countries added", countries: insertedCountries });
//   } catch (err) {
//     res.status(400).json({ message: "Error adding countries", error: err });
//   }
// });

module.exports = router;