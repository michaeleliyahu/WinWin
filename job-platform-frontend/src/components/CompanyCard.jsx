import { useState } from "react";
import ResumeDialog from "./SubmitResume";

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

  
  const handleOpenResumeDialog = (e) => {
    e.stopPropagation();
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {company.branches_in_israel}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <People sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {company.employees}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                👥 {company.users || 0} users
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 3,
              flex: 1,
              WebkitLineClamp: 3, 
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              display: { xs: 'none', sm: '-webkit-box' }
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
            Submit Resume
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