import React, { useEffect, useState } from "react";
import { getAllCompanies } from "../services/companyService";
import CompanyCard from "../components/CompanyCard";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "../styles/companyPage.css";

export default function CompanyPage() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  return (
    <div className="homepage-container">
      <div className="framer-style-header">
        <h1 className="main-title">Apply through a company employee.</h1>
        <h1 className="sub-title">Let someone inside submit for you.</h1>
      </div>

    {companies.length === 0 ? (
      <Typography textAlign="center" sx={{ mt: 4 }}>
      </Typography>
    ) : (
      <Box
        className="companies-row"
        sx={{
          mt: 3,
          px: 2,
        }}
      >
        {companies.map((company) => (
          <CompanyCard
            key={company._id}
            company={company}
            onClick={() => handleCardClick(company)}
          />
        ))}
      </Box>
      )}
    </div>
  );
}
