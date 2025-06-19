import React from "react";
import { useNavigate } from "react-router-dom";
import PillButton from "../components/PillButton";

export default function ThankYouPage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container" style={{ textAlign: "center", padding: "4rem" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎉 Thank you!</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Your application has been submitted successfully.
      </p>

      <PillButton label="Back to Home" variant="dark" onClick={() => navigate("/")}/>
    </div>
  );
}
