import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Divider
} from '@mui/material';
import { CVSubmissionItem } from './CVSubmissionItem';
import { getApplicationsByCompany } from '../services/applicationService';

export function CVSubmissions({ company }) {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (!company?._id) return;

    const fetchSubmissions = async () => {
      try {
        const data = await getApplicationsByCompany(company._id);
        setSubmissions(data);
      } catch (err) {
        console.error("Failed to load applications:", err);
      }
    };

    fetchSubmissions();
  }, [company?._id]); 

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        overflow: 'hidden',
        width: '100%',
        // maxWidth: { xs: '100vw', sm: 700, md: 900 },
        // mx: 'auto',
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          mb: 1,
          gap: { xs: 1, sm: 0 },
        }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              fontSize: { xs: '1rem', sm: '1rem' },
              maxWidth: { xs: '100%', sm: '70%' },
            }}
          >
            Recent CV Submissions
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.9rem', sm: '0.9rem' },
            maxWidth: '100%',
          }}
        >
          Manage and review candidate applications
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ p: { xs: 2, sm: 3 }, paddingTop: 0 }}>
        <Box>
          {submissions.map((submission, index) => (
            <CVSubmissionItem key={index} candidate={submission} />
          ))}
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="outlined"
            sx={{
              color: '#1976d2',
              borderColor: '#bbdefb',
              '&:hover': {
                backgroundColor: '#e3f2fd',
                borderColor: '#90caf9'
              },
              textTransform: 'none',
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              minWidth: 120,
            }}
          >
            Load More Applications
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
