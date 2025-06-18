import React, { useState } from "react";
import EmployerCompany from "../components/EmployerCompany";
import CompanyPage from "./CompanyPage";
import ApplicationPage from "./ApplicationPage";

export default function HomePage() {
  const [showApplications, setShowApplications] = useState(false);

  const toggleView = () => setShowApplications((prev) => !prev);

  return (
    <div style={styles.container}>
      <h1>דף הבית</h1>

      <div onClick={toggleView} style={{ cursor: "pointer" }}>
        <EmployerCompany />
      </div>

      {showApplications ? <ApplicationPage /> : <CompanyPage />}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "right",
    direction: "rtl",
  },
};
