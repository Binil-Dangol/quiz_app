import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout(); // Clear authentication and user data
      navigate("/"); // Redirect to login page
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "5px",
        marginTop: "10px",
      }}
      >
      Logout
    </button>
  );
};

export default Logout;