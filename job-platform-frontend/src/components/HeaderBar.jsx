import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>JobPlatform</Link>
      </div>

      <nav>
        {token ? (
          <>
            <Link to="/" style={styles.link}>Home</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#004aad",
    color: "white",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  link: {
    marginRight: "15px",
    color: "white",
    textDecoration: "none",
  },
  button: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
  },
};
