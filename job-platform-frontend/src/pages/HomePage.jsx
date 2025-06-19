import React, { useState } from "react";
import EmployerCompany from "../components/EmployerCompany";
import CompanyPage from "./CompanyPage";
import ApplicationPage from "./ApplicationPage";
import "../styles/homePage.css"; // 👉 ייבוא CSS לעיצוב כמו Framer

export default function HomePage() {
  const [showApplications, setShowApplications] = useState(false);

  const toggleView = () => setShowApplications((prev) => !prev);

  return (
    <div className="homepage-container">
      <div className="framer-style-header">
        <h1 className="main-title">Share Your Workplace.</h1>
        <h1 className="sub-title">See every company users add.</h1>
      </div>

      <div className="framer-style-buttons">
        <div className="nav-pill dark-pill">
          <p>Add Company</p>
        </div>
        <div className="nav-pill light-pill" onClick={toggleView}>
          <p>View Companies</p>
        </div>
      </div>

      <div className="employer-box" onClick={toggleView}>
        <EmployerCompany />
      </div>

      {showApplications ? <ApplicationPage /> : <CompanyPage />}
    </div>
  );
}
