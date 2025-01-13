import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserButton = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout();
      navigate("/");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        
        // Make sure to include the token in the request headers
        await axios.delete("http://localhost:5000/api/auth/delete-account", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        onLogout();
        navigate("/");
      } catch (error) {
        console.error("Error deleting account:", error.response ? error.response.data : error);
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        {user.name}
      </button>
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
};

export default UserButton;