import React from 'react';
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const handleLogin = () => {
    navigate("/login");
  };
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
           {user ? (
            <Avatar
              src={user.picture}
              alt={user.name}
              sx={{ width: 32, height: 32, cursor: 'pointer' }}
              onClick={handleLogout}
              title="Logout"
            />
          ) : (
            <Button
              variant="outlined"
              onClick={handleLogin}
              sx={{
                textTransform: 'none',
                borderColor: '#1976d2',
                color: '#1976d2',
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                  borderColor: '#1976d2'
                }
              }}
            >
              Login / Sign Up
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}