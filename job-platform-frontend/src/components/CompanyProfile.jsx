import React, { useState } from 'react';
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
import { updateUserCompany } from '../services/userService';
import { incrementUsers } from '../services/companyService';
import { useUserStore } from '../store/useUserStore';
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../services/authUtils";

export function CompanyProfile({ company: initialCompany, onJoinCompany }) {
  const updateUserCompanyId = useUserStore(state => state.updateUserCompanyId);
  const [company, setCompany] = useState(initialCompany);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isCompanyOwner = user && user.companyId === company._id;

  const handleJoinCompany = async (e) => {
    e.stopPropagation();
    if (!isTokenValid() || !user || !user._id) {
      navigate(`/login`);
      return;
    }
    try {
      const userId = user._id;
      await updateUserCompany(userId, { companyId: company._id });
      await incrementUsers(company._id);
      setCompany(prev => ({
        ...prev,
        users: (prev.users || 0) + 1
      }));
      updateUserCompanyId(company._id);
      if (onJoinCompany) {
        onJoinCompany(company._id);
      }
    } catch (error) {
      console.error("error on update user", error);
    }
  };
  
  return (
<Paper 
  elevation={0}
  sx={{ 
    p: { xs: 2, sm: 3 }, // padding קטן במובייל, גדול יותר בדסקטופ
    backgroundColor: 'white',
    borderBottom: '1px solid #e0e0e0'
  }}
>
  <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' }, // בעמודה במובייל, בשורה בדסקטופ
      alignItems: { xs: 'center', sm: 'flex-start' }, 
      gap: { xs: 2, sm: 3 }
    }}
  >
    <Avatar
      src={company.logo}
      sx={{
        width: { xs: 48, sm: 64 },
        height: { xs: 48, sm: 64 },
        fontSize: { xs: 20, sm: 24 },
        fontWeight: 600,
        borderRadius: 2,
        mb: { xs: 2, sm: 0 } // רווח תחתון במובייל כשהוא בעמודה
      }}
    />

    <Box sx={{ flex: 1, width: '100%' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          alignItems: { xs: 'flex-start', sm: 'flex-start' }, 
          justifyContent: 'space-between', 
          mb: 2,
          gap: { xs: 1, sm: 0 }
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary', mb: 1, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            {company.name}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary', 
              maxWidth: { xs: '100%', sm: '600px' },
              lineHeight: 1.6,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {company.long_description || "No description available."}
          </Typography>
        </Box>

        {!isCompanyOwner && (
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
              textTransform: 'none',
              fontWeight: 500,
              mt: { xs: 2, sm: 0 }, // רווח עליון במובייל כי בעמודה
              alignSelf: { xs: 'flex-start', sm: 'center' }
            }}
            onClick={handleJoinCompany}
          >
            i work here
          </Button>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
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
      </Box>
    </Box>
  </Box>
</Paper>

  );
}