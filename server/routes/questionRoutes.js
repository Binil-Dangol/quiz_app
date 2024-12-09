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

// Add new question (optional for testing or adding data)
// router.post("/", async (req, res) => {
//   try {
//     const question = new Question(req.body);
//     await question.save();
//     res.status(201).json({ message: "Question added", question });
//   } catch (err) {
//     res.status(400).json({ message: "Error adding question", error: err });
//   }
// });

module.exports = router;