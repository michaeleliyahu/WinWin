import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CompanyProfile } from "../components/CompanyProfile";
import { CVSubmissions } from "../components/CVSubmissions";
import { StatsCards } from "../components/StatsCards";
import { getCompanyById } from "../services/companyService";
import { Box, CircularProgress } from "@mui/material";  // <-- ייבוא CircularProgress

export default function CompanyPage() {
  const { id: companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) return;

    setLoading(true);
    getCompanyById(companyId)
      .then((data) => {
        setCompany(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Error fetching company data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyId]);

  if (loading) 
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <div>Error: {error}</div>;

  // Get current user from localStorage or global store
  const user = JSON.parse(localStorage.getItem("user"));
  const isCompanyOwner = user && user.companyId === companyId;

  return (
    <div>
      <CompanyProfile company={company} />
      <StatsCards company={company} />
      {isCompanyOwner && <CVSubmissions company={company} />}
    </div>
  );
}
