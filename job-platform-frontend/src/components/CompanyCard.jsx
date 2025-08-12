import { useState } from "react";
import ResumeDialog from "./SubmitResume";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../services/authUtils";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar
} from '@mui/material';
import {
  LocationOn,
  People,
} from '@mui/icons-material';

export function CompanyCard({ company: initialCompany, onClick }) {

    const [company] = useState(initialCompany);
    const [openResumeDialog, setOpenResumeDialog] = useState(false);
    const navigate = useNavigate();

  
  const handleOpenResumeDialog = (e) => {
    e.stopPropagation();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!isTokenValid() || !user) {
      navigate("/login", { state: { redirectTo: "/" } });
      return;
    }
    setOpenResumeDialog(true);
  };
  
  const handleCloseResumeDialog = () => {
    setOpenResumeDialog(false);
  };
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderColor: '#1976d2',
        },
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          onClick={onClick}
          sx={{
            cursor: 'pointer',
            borderRadius: 2,
            paddingBottom: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              src={company.logo}
              sx={{ width: 50, height: 50, mr: 1, borderRadius: 2 }}
              variant="square"
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                {company.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {company.industry}
              </Typography>
            </Box>
          </Box>

          {/* Company Details */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'column' },
              gap: { xs: 2, sm: 1 },
              alignItems: { xs: 'center', sm: 'flex-start' },
              justifyContent: { xs: 'flex-start', sm: 'initial' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOn sx={{ fontSize: { xs: 14, sm: 16 }, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.8rem' } }}>
                {company.branches_in_israel}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <People sx={{ fontSize: { xs: 14, sm: 16 }, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.80rem' } }}>
                {company.employees}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mt: 1,
              mb: 1,
              flex: 1,
              WebkitLineClamp: 3, 
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: { xs: '0.8rem', sm: '0.80rem' },
            }}
            onClick={onClick}
          >
            {company.description}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>

          <Button
            variant="outlined"
            size="small"
            sx={{
              color: '#388e3c',
              borderColor: '#388e3c',
              '&:hover': {
                backgroundColor: '#e8f5e8',
                borderColor: '#2e7d32'
              },
              textTransform: 'none',
              flex: 1,
              fontSize: { xs: '0.7rem', sm: '0.875rem' }
            }}
            onClick={handleOpenResumeDialog}
          >
            Submit Application
          </Button>
        </Box>
      </CardContent>
      <ResumeDialog
        open={openResumeDialog}
        onClose={handleCloseResumeDialog}
        company={company}
      />
    </Card>
  );
}