import React from "react";
import EmployerCompany from "../components/EmployerCompany";
import CompanyPage from "./CompanyPage";

export default function HomePage() {
  return (
    <div style={styles.container}>
      <h1>דף הבית</h1>
      <EmployerCompany />
      <CompanyPage />
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
