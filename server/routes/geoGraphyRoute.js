const express = require("express");
const Question = require("../models/QuestionModel");
const router = express.Router();

// Fetch all countries (options)
router.get("/", async (req, res) => {
  try {
    const geoGraphyQuestions = await Question.find({});
    res.status(200).json(geoGraphyQuestions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching countries", error: err });
  }
});

module.exports = router;
