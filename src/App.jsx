import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Quiz from "./components/Quiz";
import FlagsQuiz from "./components/FlagsQuiz";
import MapsQuiz from "./components/MapsQuiz";

const App = () => {
  const handleLoginSuccess = (token, user) => {
    localStorage.setItem("token", token);
    console.log("Logged in user:", user);
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/flags-quiz" element={<FlagsQuiz />} />
      <Route path="/maps-quiz" element={<MapsQuiz />} />
    </Routes>
  );
};

export default App;