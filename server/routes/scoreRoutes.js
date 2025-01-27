const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = "your_jwt_secret_key"; // Replace with a strong secret in production

// Authentication Middleware (you can copy this from authRoutes.js)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Update Score Route
router.post("/update-score", authenticateToken, async (req, res) => {
  try {
    const { category, subcategory, score } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!category || !subcategory || score === undefined) {
      return res.status(400).json({ message: "Invalid score data." });
    }

    // Find user and update score
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.updateScore(category, subcategory, score);

    res.status(200).json({ 
      message: "Score updated successfully",
      scores: user.scores 
    });
  } catch (error) {
    console.error("Score update error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});

// Get User Scores Route
router.get("/scores", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ scores: user.scores });
  } catch (error) {
    console.error("Fetch scores error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});

module.exports = router;