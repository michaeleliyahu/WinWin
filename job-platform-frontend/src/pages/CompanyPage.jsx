import React, { useEffect, useState } from "react";
import { getAllCompanies } from "../services/companyService";
import CompanyCard from "../components/CompanyCard";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CompanyPage() {
  const [companies, setCompanies] = useState([]);
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
    navigate(`/submit/${company._id}`, { state: { company } });
  };


  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3, direction: "rtl" }}>
      <Typography variant="h4" mb={3} align="center">
        רשימת חברות
      </Typography>

      {companies.length === 0 && <Typography>טוען חברות...</Typography>}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {companies.map((company) => (
          <CompanyCard key={company._id} company={company} onClick={handleCardClick} />
        ))}
      </Box>
    </Box>
  );
}
