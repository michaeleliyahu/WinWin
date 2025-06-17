// src/pages/RoleSelectionPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    if (role === "job-seeker") {
      navigate("/job-seeker");
    } else if (role === "company-employee") {
      navigate("/company");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Select Your Role</h2>
      <button onClick={() => handleSelectRole("job-seeker")}>
        I am a Job Seeker
      </button>
      <button onClick={() => handleSelectRole("company-employee")} style={{ marginLeft: "10px" }}>
        I work at a Company
      </button>
    </div>
  );
}
