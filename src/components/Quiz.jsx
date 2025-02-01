import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserButton from "./UserButton";

const Quiz = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthenticated(false);
  };

  const handleQuizTypeSelect = (quizType) => {
    navigate("/quiz-subcategory", { state: { quizType } });
  };

  // State to track which card is hovered
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!authenticated) {
    return (
      <h1 style={styles.logoutMessage}>
        You have been logged out. Redirecting to login...
      </h1>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Choose a Quiz Type</h1>
      <p style={styles.subtitle}>Select a quiz to get started:</p>
      <div style={styles.quizOptions}>
        {/* Flags Option */}
        <div
          style={{
            ...styles.optionCard,
            ...(hoveredCard === "flag" ? styles.optionCardHover : {}),
          }}
          onClick={() => handleQuizTypeSelect("flag")}
          onMouseEnter={() => setHoveredCard("flag")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <img
            src="/Flags.jpg" // Replace with your actual image path
            alt="Flags Quiz"
            style={styles.optionImage}
          />
          <p style={styles.optionText}>Flags</p>
        </div>
        {/* Maps Option */}
        <div
          style={{
            ...styles.optionCard,
            ...(hoveredCard === "map" ? styles.optionCardHover : {}),
          }}
          onClick={() => handleQuizTypeSelect("map")}
          onMouseEnter={() => setHoveredCard("map")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <img
            src="/Maps.jpg" // Replace with your actual image path
            alt="Maps Quiz"
            style={styles.optionImage}
          />
          <p style={styles.optionText}>Maps</p>
        </div>
      </div>
      <UserButton user={user} onLogout={handleLogout} />
    </div>
  );
};

// Internal CSS styles
const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#eaf6f6", // Light Teal
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  logoutMessage: {
    textAlign: "center",
    color: "#2c7873",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: "2.5em",
    color: "#2c7873", // Deep Teal
    marginBottom: "10px",
    marginTop: 0,
  },
  subtitle: {
    fontSize: "1.2em",
    color: "#2c7873",
    marginBottom: "30px",
    marginTop: 0,
  },
  quizOptions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    flexWrap: "wrap",
  },
  optionCard: {
    height: "250px",
    width: "300px",
    cursor: "pointer",
    textAlign: "center",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s, background-color 0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  optionCardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
  optionImage: {
    height: "80%",
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  optionText: {
    fontSize: "1.2em",
    color: "#2c7873",
    marginTop: "auto",
    marginBottom: 0,
  },
};

export default Quiz;