const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ScoreSchema = new mongoose.Schema({
  category: { type: String, required: true }, // 'flags' or 'maps'
  subcategory: { type: String, required: true }, // 'Asia', 'Africa', etc.
  highestScore: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  scores: [ScoreSchema]
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to update or add a score
userSchema.methods.updateScore = function(category, subcategory, newScore) {
  const existingScoreIndex = this.scores.findIndex(
    score => score.category === category && score.subcategory === subcategory
  );

  if (existingScoreIndex !== -1) {
    // Update score if new score is higher
    if (newScore > this.scores[existingScoreIndex].highestScore) {
      this.scores[existingScoreIndex].highestScore = newScore;
    }
  } else {
    // Add new score if not exists
    this.scores.push({ category, subcategory, highestScore: newScore });
  }

  return this.save();
};

const User = mongoose.model("User", userSchema);
module.exports = User;