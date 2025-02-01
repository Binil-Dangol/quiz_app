import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      // Store both token and user information
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onLoginSuccess(response.data.token, response.data.user);
      navigate("/quiz");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome Back</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      <p style={styles.text}>
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          style={styles.linkButton}
        >
          Register
        </button>
      </p>
    </div>
  );
};

// Internal CSS styles
const styles = {
  container: {
    margin: "0px",
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#eaf6f6", // Light Teal
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: "2.5em",
    color: "#2c7873", // Deep Teal
    marginBottom: "30px",
  },
  error: {
    color: "#d9534f", // Bootstrap Danger Red
    marginBottom: "20px",
  },
  form: {
    display: "inline-block",
    width: "300px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontSize: "1em",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#17a2b8", // Bootstrap Info Blue
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1.1em",
    marginTop: "10px",
  },
  text: {
    marginTop: "20px",
    color: "#2c7873",
  },
  linkButton: {
    color: "#17a2b8",
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "1em",
    padding: 0,
    fontFamily: "inherit",
  },
};

export default Login;