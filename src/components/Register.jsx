import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Your Account</h1>
      {success ? (
        <p style={styles.successMessage}>
          Registration successful! You can now{" "}
          <button onClick={() => navigate("/")} style={styles.linkButton}>
            log in
          </button>
          .
        </p>
      ) : null}
      {error && <p style={styles.error}>{error}</p>}
      {!success && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
      )}
      {!success && (
        <p style={styles.text}>
          Already have an account?{" "}
          <button onClick={() => navigate("/")} style={styles.linkButton}>
            Log in
          </button>
        </p>
      )}
    </div>
  );
};

// Internal CSS styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // Full viewport height
    textAlign: "center",
    backgroundColor: "#eaf6f6", // Light Teal
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: "2.5em",
    color: "#2c7873", // Deep Teal
    marginBottom: "20px",
    marginTop: 0,
  },
  successMessage: {
    fontSize: "1.2em",
    color: "#2c7873",
  },
  error: {
    color: "#d9534f", // Bootstrap Danger Red
    marginBottom: "20px",
    marginTop: 0,
  },
  form: {
    width: "300px",
    textAlign: "left",
    margin: 0,
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1em",
    boxSizing: "border-box",
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
    marginBottom: 0,
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

export default Register;