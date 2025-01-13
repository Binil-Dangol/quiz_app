const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true }, 
  imageUrl: { type: String, required: true },
  correctOption: { type: String, required: true },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;