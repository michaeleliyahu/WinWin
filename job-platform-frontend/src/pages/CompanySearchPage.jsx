import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCompanies, createCompany } from '../services/companyService';

import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Box,
  Card
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { CompanyCard } from '../components/CompanyCard';

export function CompanySearchPage() {
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
  console.log("Navigating to company:", company);
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login", {
      state: { redirectTo: `/company/${company._id}`, company },
    });
    return;
  }

  navigate(`/company/${company._id}`, { state: { company } });
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
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4, paddingTop: '0rem' }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Card sx={{ textAlign: 'center', mb: 6, paddingTop: 4, paddingBottom: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 4,
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)'

            
            }}
          >
            Find Your Next Opportunity
          </Typography>

          {/* Search Bar */}
          <Box sx={{ maxWidth: '80%', mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search for companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleInputKeyDown}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary'}} />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
          </Box>
        </Card>

        {/* Companies Grid */}
        <Grid container spacing={3}>
          {filteredCompanies.map((company, index) => (
            <Grid item xs={4} sm={6} md={4} key={index}>
              <CompanyCard
                key={company._id}
                company={company}
                onClick={() => handleCardClick(company)}
              />
            </Grid>
          ))}
        </Grid>

        {/* No Results Message */}
        {filteredCompanies.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
              No companies found
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Try adjusting your search terms
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}