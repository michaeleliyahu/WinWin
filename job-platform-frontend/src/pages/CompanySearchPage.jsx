import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCompanies, createCompany } from '../services/companyService';
import { Search, Send } from '@mui/icons-material';
import { CompanyCard } from '../components/CompanyCard';
import {
  Typography,
  TextField,
  CircularProgress,
  InputAdornment,
  Grid,
  Box,
  Card,
  IconButton
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
        setLoading(false); 
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

const handleSearch = async () => {
  if (!searchTerm.trim()) return;

  const trimmed = searchTerm.trim().toLowerCase();

  const existing = companies.find((c) =>
    c.name.toLowerCase() === trimmed
  );

  if (existing) {
    navigate(`/company/${existing._id}`);
    return;
  }

  setLoading(true);
  try {
    const newCompany = await createCompany({ name: searchTerm.trim() });
    navigate(`/company/${newCompany._id}`);
  } catch (err) {
    setLoading(false); 
    if (err.status === 404) {
      alert("We couldn’t find this company online. Please check the name and try again.");
    } else {
      alert(err.detail || "Something went wrong.");
    }
  }
};

const handleInputKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSearch();
  }
};

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4, paddingTop: '0rem' , p: 2}}>
        {/* Header Section */}
        <Card sx={{ textAlign: 'center', paddingTop: 4, paddingBottom: 4 }}>
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
                    <Search sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <Send sx={{ color: '#1976d2' }} />
                    </IconButton>
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
          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <CircularProgress />
          </Box>
        ) : (
          <>
          <Grid container spacing={3} sx={{ paddingTop: 2 }}>
            {filteredCompanies.map((company) => (
              <Grid
                key={company._id}
                size={{ xs: 12, sm: 6, md: 4 }} // הגדרת הגודל החדש
                sx={{ boxSizing: 'border-box' }}
              >
                <CompanyCard company={company} onClick={() => handleCardClick(company)} />
              </Grid>
            ))}
          </Grid> 
            {/* No Results Message */}
            {filteredCompanies.length === 0 && (
              <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                  Looks like no one added this company yet.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Press Enter to try a global search.
                </Typography>
              </Box>
            )}
          </>
        )}
    </Box>
  );
}