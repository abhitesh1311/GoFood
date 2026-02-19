import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/CreateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        
        setFormData({
          name: "",
          location: "",
          email: "",
          password: ""
        });

        
        navigate("/login");
      } else {
        alert("Invalid data ");
      }

    } catch (err) {
      alert("Server error ");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Account 🍔</h2>
        <p style={styles.subtext}>Join us & order your favorite food</p>

        <form onSubmit={handleSubmit} noValidate>
          {["name", "location", "email", "password"].map((field) => (
            <div key={field} style={styles.inputGroup}>
              <input
                type={
                  field === "password"
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                name={field}
                required
                value={formData[field]}
                onChange={handleChange}
                style={styles.input}
                autoComplete="off"
              />
              <label
                style={{
                  ...styles.label,
                  top: formData[field] ? "-8px" : "50%",
                  fontSize: formData[field] ? "12px" : "14px",
                  color: formData[field] ? "#ee0979" : "#999"
                }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>

        <Link to="/login" style={styles.login}>
          Already have an account?{" "}
          <span style={styles.loginSpan}>Login</span>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #7b53e9, #370eee)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "#fffafa",
    padding: 40,
    width: 380,
    borderRadius: 16,
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    textAlign: "center",
    position: "relative"
  },
  heading: {
    marginBottom: 8,
    color: "#333"
  },
  subtext: {
    marginBottom: 30,
    color: "#777"
  },
  inputGroup: {
    position: "relative",
    marginBottom: 25
  },
  input: {
    width: "100%",
    padding: 10,
    border: "none",
    borderBottom: "2px solid #ccc",
    outline: "none",
    fontSize: 16
  },
  label: {
    position: "absolute",
    left: 0,
    transform: "translateY(-50%)",
    pointerEvents: "none",
    transition: "0.3s"
  },
  button: {
    width: "100%",
    padding: 12,
    border: "none",
    borderRadius: 25,
    background: "linear-gradient(135deg, #3810eb, #1b6ba0)",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer"
  },
  login: {
    marginTop: 20,
    fontSize: 14
  },
  loginSpan: {
    color: "#ee0979",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Signup;
