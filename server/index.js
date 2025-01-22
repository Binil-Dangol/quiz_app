const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const questionRoutes = require("./routes/questionRoutes");
const countryRoutes = require("./routes/countryRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
// mongodb://localhost:27017/quizDB
// mongodb+srv://Binil:test1234@nodetuts.ehfdi.mongodb.net/quizDB?retryWrites=true&w=majority&appName=nodetuts
const MONGO_URI = "mongodb+srv://Binil:test1234@nodetuts.ehfdi.mongodb.net/quizDB?retryWrites=true&w=majority&appName=nodetuts"; // MongoDB URI
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/countries", countryRoutes);

app.use("/api/auth", authRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));