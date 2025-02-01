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
    if (
      window.confirm(
        "Are you sure you want to permanently delete your account? This action cannot be undone."
      )
    ) {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        // Make sure to include the token in the request headers
        await axios.delete("http://localhost:5000/api/auth/delete-account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        onLogout();
        navigate("/");
      } catch (error) {
        console.error(
          "Error deleting account:",
          error.response ? error.response.data : error
        );
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={styles.userButton}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#138496")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#17a2b8")}
      >
        {user.name}
        <span style={styles.arrow}>{showDropdown ? "▲" : "▼"}</span>
      </button>
      {showDropdown && (
        <div style={styles.dropdown}>
          <button
            onClick={handleLogout}
            style={{
              ...styles.dropdownButton,
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#138496")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#17a2b8")}
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            style={{
              ...styles.deleteButton,
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c82333")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
};

// Internal CSS styles
const styles = {
  container: {
    position: "relative",
    display: "inline-block",
    marginTop: "20px",
  },
  userButton: {
    padding: "10px 15px",
    fontSize: "1em",
    cursor: "pointer",
    backgroundColor: "#17a2b8", // Bootstrap Info Blue
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.2s",
  },
  arrow: {
    marginLeft: "10px",
    fontSize: "0.8em",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    zIndex: 10,
    marginTop: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dropdownButton: {
    padding: "10px 20px",
    backgroundColor: "#17a2b8",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1em",
    fontFamily: "inherit",
    cursor: "pointer",
    marginBottom: "5px",
    transition: "background-color 0.2s",
    // Add the following properties
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545", // Bootstrap Danger Red
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1em",
    fontFamily: "inherit",
    cursor: "pointer",
    transition: "background-color 0.2s",
    // Add the following properties
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default UserButton;