import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCompanies, createCompany } from '../services/companyService';
import { Search } from '@mui/icons-material';
import { CompanyCard } from '../components/CompanyCard';
import {
  Container,
  Typography,
  TextField,
  CircularProgress,
  InputAdornment,
  Grid,
  Box,
  Card
} from '@mui/material';
import { isTokenValid } from "../services/authUtils";


export function CompanySearchPage() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const all = await getAllCompanies();
        setCompanies(all);
      } catch (err) {
        console.error("error get all company", err);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchCompanies();
  }, []);

const handleCardClick = (company) => {
    if (!isTokenValid() || !user || !user._id) {
      navigate(`/login`);
      return;
    }
  navigate(`/company/${company._id}`);
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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3} sx={{ gap: '0' }}>
              {filteredCompanies.map((company) => (
                <Box
                  key={company._id}
                  sx={{
                    width: {
                      xs: '100%',      
                      sm: '50%',       
                      md: '33.33%',    
                    },
                    padding: 1,
                    boxSizing: 'border-box',
                  }}
                >
                  <CompanyCard company={company} onClick={() => handleCardClick(company)} />
                </Box>
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
          </>
        )}
      </Container>
    </Box>
  );
}