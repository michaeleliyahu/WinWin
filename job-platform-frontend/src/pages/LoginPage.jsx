import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import "../styles/Login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.redirectTo || "/HomePage";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate(redirectTo, { state: location.state }); // אם צריך, גם את ה-company
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Login</header>
          <form onSubmit={handleSubmit}>
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

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

            <div className="form-link">
              <a href="#" className="forgot-pass">Forgot password?</a>
            </div>

            <div className="field button-field">
              <button type="submit">Login</button>
            </div>
          </form>

          <div className="form-link">
            <span>Don't have an account? <a href="/register" className="link signup-link">Signup</a></span>
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
