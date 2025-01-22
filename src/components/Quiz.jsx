import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserButton from "./UserButton";

const Quiz = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthenticated(false);
  };

  const handleQuizTypeSelect = (quizType) => {
    navigate('/quiz-subcategory', { state: { quizType } });
  };

  if (!authenticated) {
    return <h1>You have been logged out. Redirecting to login...</h1>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Start Quiz</h1>
      <p>Select a quiz type to get started:</p>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginRight: "10px",
        }}
        onClick={() => handleQuizTypeSelect('flag')}
      >
        Flags
      </button>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#008CBA",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={() => handleQuizTypeSelect('map')}
      >
        Maps
      </button>
      <br/>
      <UserButton user={user} onLogout={handleLogout} />
    </div>
  );
};

export default Quiz;