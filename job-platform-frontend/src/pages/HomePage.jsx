import { useNavigate } from "react-router-dom";
import PillButton from "../components/PillButton";
import "../styles/homePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <div className="framer-style-header">
        <h1 className="main-title">Share Your Workplace</h1>
        <h1 className="sub-title">Add your company and help build our list</h1>
      </div>

      <div className="framer-style-buttons">
        <PillButton label="Add Company" variant="dark" />
        <PillButton label="View Companies" onClick={() => navigate("/CompanyPage")} />
      </div>
    </div>
  );
}