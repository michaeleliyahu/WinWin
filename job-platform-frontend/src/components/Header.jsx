import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  Snackbar,
  Alert
} from '@mui/material';
import { Check } from '@mui/icons-material';
import { useUserStore } from "../store/useUserStore";

export function Header() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleNavigateCandidates = () => {
    const token = localStorage.getItem("token");
    const companyId = user?.companyId || user?.company?._id;

    if (!companyId) {
      setSnackbarOpen(true);
      return;
    }

    if (!token) {
      navigate("/login", {
        state: { redirectTo: `/company/${companyId}` },
      });
      return;
    }
    navigate(`/company/${companyId}`);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', borderBottom: '1px solid #e0e0e0', color: 'text.primary' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 3, width: '80%', maxWidth: '72rem', margin: '0 auto' }}>
          <Box onClick={() => navigate("/")} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
            <Box sx={{ width: 32, height: 32, backgroundColor: '#1976d2', borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check sx={{ color: 'white', fontSize: 16 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.primary' }}>
              JobConnect
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button
              color="inherit"
              sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' }, textTransform: 'none' }}
              onClick={() => navigate('/')}
            >
              Companies
            </Button>

            <Button
              color="inherit"
              sx={{ color: '#1976d2', fontWeight: 500, textTransform: 'none' }}
              onClick={handleNavigateCandidates}
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
              <Avatar
                sx={{ width: 32, height: 32, cursor: 'pointer' }}
                onClick={handleLogin}
                title="Logout"
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="warning" variant="filled" sx={{ width: '100%' }}>
          You must select or create a company first
        </Alert>
      </Snackbar>
    </>
  );
}
