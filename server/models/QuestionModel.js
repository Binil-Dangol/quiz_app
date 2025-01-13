const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String], // Array of strings
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 4; // Ensure exactly 4 options
      },
      message: "There must be exactly 4 options."
    }
  },
  correctAnswer: {
    type: String,
    required: true
  },
  difficultyLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 5 // Difficulty is between 1 and 5
  },
  category: {
    type: String,
    required: true
  },
  hints: {
    type: String,
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
