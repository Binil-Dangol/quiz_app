import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Quiz from "./components/Quiz";
import QuizSubcategory from "./components/QuizSubcategory";
import FlagsQuiz from "./components/FlagsQuiz";
import MapsQuiz from "./components/MapsQuiz";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const handleLoginSuccess = (token, user) => {
    localStorage.setItem("token", token);
    console.log("Logged in user:", user);
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/quiz" element={<PrivateRoute element={Quiz} />} />
      <Route path="/quiz-subcategory" element={<PrivateRoute element={QuizSubcategory} />} />
      <Route path="/flags-quiz" element={<PrivateRoute element={FlagsQuiz} />} />
      <Route path="/maps-quiz" element={<PrivateRoute element={MapsQuiz} />} />
    </Routes>
  );
};

export default App;