import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";
import "../styles/Login.css";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    try {
      const data = await registerUser({ firstName, lastName, email, password });
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token_type", data.token_type);
      navigate("/HomePage");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };


  return (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Sign Up</header>
          <form onSubmit={handleSubmit}>
            <div className="field input-field">
              <input
                type="text"
                placeholder="First Name"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="field input-field">
              <input
                type="text"
                placeholder="Last Name"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Confirm Password"
                className="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

            <div className="field button-field">
              <button type="submit">Register</button>
            </div>
          </form>

          <div className="form-link">
            <span>Already have an account? <a href="/Login" className="link login-link">Login</a></span>
          </div>
        </div>

        <div className="line"></div>

        <div className="media-options">
          <button type="button" className="field facebook">
            <i className="bx bxl-facebook facebook-icon"></i>
            <span>Sign up with Facebook</span>
          </button>
        </div>

        <div className="media-options">
          <button type="button" className="field google">
            <img src="/images/google.png" alt="Google" className="google-img" />
            <span>Sign up with Google</span>
          </button>
        </div>
      </div>
    </section>
  );
}
