import React from 'react';
import { downloadResume } from "../services/applicationService";
import { 
  Box, 
  Typography, 
  Button, 
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import { 
  Download, 
  Check 
} from '@mui/icons-material';

export function CVSubmissionItem({ candidate }) {
  const getFileTypeColor = (fileType) => {
    if (fileType.includes('PDF')) {
      return { color: '#d32f2f', backgroundColor: '#ffebee' };
    }
    if (fileType.includes('DOCX')) {
      return { color: '#1976d2', backgroundColor: '#e3f2fd' };
    }
    return { color: '#616161', backgroundColor: '#f5f5f5' };
  };

  const fileTypeStyle = getFileTypeColor(candidate.fileType);

  return (
    <Box>
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
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
              {candidate.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
              {candidate.role}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Submitted {candidate.submittedTime}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Chip
                  label={candidate.fileType}
                  size="small"
                  sx={{
                    height: 16,
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    ...fileTypeStyle
                  }}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  • {candidate.fileSize}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Download />}
          onClick={() => downloadResume(candidate.fileId)}  // ← כאן החיבור
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
          Download
        </Button>
          
          <Button
            variant="outlined"
            size="small"
            startIcon={<Check />}
            sx={{
              color: candidate.isHandled ? '#388e3c' : '#616161',
              borderColor: candidate.isHandled ? '#c8e6c9' : '#e0e0e0',
              backgroundColor: candidate.isHandled ? '#e8f5e8' : 'transparent',
              '&:hover': { 
                backgroundColor: '#e8f5e8',
                borderColor: '#a5d6a7',
                color: '#388e3c'
              },
              textTransform: 'none'
            }}
          >
            Mark Handled
          </Button>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}