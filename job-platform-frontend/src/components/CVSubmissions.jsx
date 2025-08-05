import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Divider
} from '@mui/material';
import { CVSubmissionItem } from './CVSubmissionItem';
import {
  FilterList,
  Download
} from '@mui/icons-material';
import { getApplicationsByCompany } from '../services/applicationService';

export function CVSubmissions({ company }) {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (!company?._id) return;

    const fetchSubmissions = async () => {
      try {
        const data = await getApplicationsByCompany(company._id);

        const formatted = data.map(app => ({
          name: `${app.firstName} ${app.lastName}`,
          role: app.jobLink || "N/A",
          submittedTime: new Date(app.uploaded_at).toLocaleString(),
          fileType: "PDF",
          fileSize: "—",
          isHandled: false,
          avatar: app.firstName[0] + app.lastName[0] || "??",
          fileId: app.resume_file_id
        }));

        setSubmissions(formatted);
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
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Recent CV Submissions
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterList />}
              sx={{
                color: 'text.secondary',
                borderColor: '#e0e0e0',
                textTransform: 'none'
              }}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<Download />}
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
                textTransform: 'none'
              }}
            >
              Export All
            </Button>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Manage and review candidate applications
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ p: 3 , paddingTop: 0}}>
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
              textTransform: 'none'
            }}
          >
            Load More Applications
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
