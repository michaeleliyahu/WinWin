import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper,
  Avatar
} from '@mui/material';
import { 
  LocationOn, 
  People, 
  Language 
} from '@mui/icons-material';

export function CompanyProfile({ company }) {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
        <Avatar
          src={company.logo}
          sx={{
            width: 64,
            height: 64,
            fontSize: 24,
            fontWeight: 600,
            borderRadius: 2
          }}
        >
          T
        </Avatar>
        
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                {company.name}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary', 
                  maxWidth: '600px',
                  lineHeight: 1.6 
                }}
              >
              {company.long_description || "No description available."}
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Edit Profile
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {company.branches_in_israel || company.location || ""}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <People sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {company.employees + " employees"}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Language sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                techflow.com
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}