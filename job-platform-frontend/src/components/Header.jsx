import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Button, Avatar, Drawer, List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material';
import { Check, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from "../store/useUserStore";

export function Header() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };


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

    if (!token) {
      navigate("/login", {
        state: { redirectTo: `/company/${companyId}` },
      });
      return;
    }
    navigate(`/company/${companyId}`);
  };

  const navItems = [
    { label: 'Companies', onClick: () => navigate('/') },
    { label: 'Candidates', onClick: handleNavigateCandidates }
  ];

  return (
    <>
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        color: 'text.primary',
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          px: { xs: 2, sm: 3 },
          width: { xs: '100%', sm: '80%' },
          maxWidth: { xs: '100%', sm: '72rem' },
          margin: '0 auto',
        }}
      >
        {/* Left side: hamburger + logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Hamburger (mobile only) */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: '#1976d2',
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Check sx={{ color: 'white', fontSize: 16 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 500, color: 'text.primary' }}
            >
              RefeChain
            </Typography>
          </Box>
        </Box>

        {/* Right side: nav (desktop) + avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Desktop navigation */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 2.5,
            }}
          >
            <Button
              color="inherit"
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' },
                textTransform: 'none',
              }}
              onClick={() => navigate('/')}
            >
              Companies
            </Button>

            <Button
              color="inherit"
              sx={{
                color: '#1976d2',
                fontWeight: 500,
                textTransform: 'none',
              }}
              onClick={handleNavigateCandidates}
            >
              Candidates
            </Button>
          </Box>

          {/* Avatar (always visible) */}
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
              title="Login"
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
    </>
  );
}
