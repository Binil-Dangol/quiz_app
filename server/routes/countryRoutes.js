const express = require("express");
const Country = require("../models/Country");
const router = express.Router();

// Fetch all countries (options)
router.get("/", async (req, res) => {
  try {
    const countries = await Country.find({});
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json({ message: "Error fetching countries", error: err });
  }
});

module.exports = router;