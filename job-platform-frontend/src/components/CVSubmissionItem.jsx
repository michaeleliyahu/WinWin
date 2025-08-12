import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { downloadResume, submitApplication } from "../services/applicationService";
import { FaRegFileWord  } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { BsFiletypePdf } from "react-icons/bs";
import { 
  Box, 
  Typography, 
  Button, 
  Avatar,
  Chip,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Download, 
  Check, 
  Language 
} from '@mui/icons-material';

export function CVSubmissionItem({ candidate }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Local handled state so we can update UI immediately after success
  const [isHandled, setIsHandled] = useState(candidate.isHandled);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarError, setSnackbarError] = useState("");

  // Assumes candidate.id contains the application id required by backend
  const handleMarkHandled = async () => {
    if (isHandled) return; // avoid duplicate calls
    try {
  // Better debug logging: log id separately and full object
  console.log('Candidate object:', candidate);
      const res = await submitApplication(candidate.id);
      if (res?.success) {
        setIsHandled(true);
        setSnackbarError("");
        setSnackbarOpen(true);
      } else {
        setSnackbarError("Failed to mark handled");
        setSnackbarOpen(true);
      }
    } catch (e) {
      setSnackbarError(e.message || "Failed to mark handled");
      setSnackbarOpen(true);
    }
  };


  return (
    <Box sx={{}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, #42a5f5 0%, #ab47bc 100%)',
              fontWeight: 500
            }}
          >
            {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5, marginBottom: 0  }}>
              {candidate.name}
            </Typography>
            <Box
              component="a"
              href={candidate.role}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                mb: 0.5,
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Language sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {(() => {
                  try {
                    const url = new URL(candidate.role);
                    return url.hostname.replace('www.', '');
                  } catch {
                    return candidate.role;
                  }
                })()}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0. }}>
                {candidate.fileType.includes('PDF') && <BsFiletypePdf style={{ color: '#d32f2f', fontSize: '1rem' }} />}
                {candidate.fileType.includes('DOCX') && <FaRegFileWord style={{ color: '#1976d2', fontSize: '1rem' }} />}
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Submitted {candidate.submittedTime}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile ? (
            <>
              <FaDownload style={{ fontSize: '1.2rem', color: '#1976d2', cursor: 'pointer' }} onClick={() => downloadResume(candidate.fileId)} />
              <Check 
                onClick={handleMarkHandled}
                sx={{ fontSize: '1.2rem', color: isHandled ? '#388e3c' : '#616161', ml: 1, cursor: 'pointer' }} 
              />
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                size="small"
                startIcon={<FaDownload style={{ fontSize: '0.8rem' }} />}
                onClick={() => downloadResume(candidate.fileId)}
                sx={{
                  color: '#1976d2',
                  borderColor: '#bbdefb',
                  minWidth: undefined,
                  px: 2,
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    borderColor: '#90caf9',
                  },
                  textTransform: 'none',
                }}
              >
                Download
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Check />}
                onClick={handleMarkHandled}
                sx={{
                  color: isHandled ? '#388e3c' : '#616161',
                  borderColor: isHandled ? '#c8e6c9' : '#e0e0e0',
                  backgroundColor: isHandled ? '#e8f5e8' : 'transparent',
                  minWidth: undefined,
                  px: 2,
                  '&:hover': {
                    backgroundColor: '#e8f5e8',
                    borderColor: '#a5d6a7',
                    color: '#388e3c',
                  },
                  textTransform: 'none',
                }}
              >
                {isHandled ? 'Handled' : 'Mark Handled'}
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Divider />
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarError ? 'error' : 'success'} 
          sx={{ width: '100%' }}
        >
          {snackbarError || 'Application marked as handled'}
        </Alert>
      </Snackbar>
    </Box>
  );
}