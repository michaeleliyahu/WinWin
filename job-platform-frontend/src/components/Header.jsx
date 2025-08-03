import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Typography, 
  Button, 
  Avatar,
  IconButton
} from '@mui/material';
import { Check } from '@mui/icons-material';

export function Header() {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e0e0e0',
        color: 'text.primary'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              backgroundColor: '#1976d2',
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Check sx={{ color: 'white', fontSize: 16 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.primary' }}>
            JobConnect
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button 
            color="inherit" 
            sx={{ 
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              textTransform: 'none'
            }}
          >
            Dashboard
          </Button>
          <Button 
            color="inherit" 
            sx={{ 
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              textTransform: 'none'
            }}
          >
            Companies
          </Button>
          <Button 
            color="inherit" 
            sx={{ 
              color: '#1976d2',
              fontWeight: 500,
              textTransform: 'none'
            }}
          >
            Candidates
          </Button>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300' }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}