const express = require("express");
const Question = require("../models/Question");
const router = express.Router();

// Fetch all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find({});
    //console.log(questions);
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions", error: err });
  }
});

module.exports = router;