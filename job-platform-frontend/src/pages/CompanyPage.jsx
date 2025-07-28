import React, { useEffect, useState } from "react";
import { getAllCompanies, createCompany } from "../services/companyService";
import CompanyCard from "../components/CompanyCard";
import { Box, Typography } from "@mui/material";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import "../styles/companyPage.css";
import ChatComponent from "../components/ChatComponent"; // <-- Add this line

export default function CompanyPage() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const all = await getAllCompanies();
        setCompanies(all);
      } catch (err) {
        console.error("שגיאה בשליפת חברות", err);
      }
    };
    fetchCompanies();
  }, []);

  const handleCardClick = (company) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        state: { redirectTo: `/submit/${company._id}`, company },
      });
      return;
    }

    navigate(`/submit/${company._id}`, { state: { company } });
  };

  const handleInputKeyDown = async (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      e.preventDefault();
      setLoading(true);
      try {
        const newCompany = await createCompany({ name: searchTerm.trim() });
        setCompanies((prev) => [...prev, newCompany]);
        setSearchTerm("");
      } catch (err) {
        alert(err.message || "Failed to create company");
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homepage-container">
      <div className="framer-style-header">
        <h1 className="main-title">Apply through a company employee.</h1>
        <h1 className="sub-title">Let someone inside submit for you.</h1>
      </div>
      <Paper component="form" className="search-form">
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="חפש חברה לפי שם"
          inputProps={{ 'aria-label': 'search companies' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleInputKeyDown}
          disabled={loading}
        />
        {searchTerm && (
          <IconButton
            sx={{ p: '10px' }}
            onClick={() => setSearchTerm("")}
            aria-label="clear"
          >
            <ClearIcon />
          </IconButton>
        )}
      </Paper>
      {companies.length === 0 ? (
        <Typography textAlign="center" sx={{ mt: 4 }}>
        </Typography>
      ) : (
        <Box className="companies-row">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company._id}
              company={company}
              onClick={() => handleCardClick(company)}
            />
          ))}
        </Box>
      )}
      <ChatComponent /> {/* <-- Add this line to render the chat */}
    </div>
  );
}