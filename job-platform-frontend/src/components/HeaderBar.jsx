import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import "../styles/headerBar.css"; 

export default function HeaderBar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinks = [
    { label: "Browse", path: "/browse" },
    { label: "Add Company", path: "/add-company" },
    { label: "About", path: "/about" },
  ];

  const renderNavLinks = () =>
    navLinks.map((link) => (
      <div className="nav-pill" key={link.path}>
        <Link to={link.path} onClick={() => setDrawerOpen(false)}>
          {link.label}
        </Link>
      </div>
    ));

  return (
    <>
      <Box className="header-bar">
        <Typography
          component={Link}
          to="/"
          className="logo"
        >
          CompanyHub®
        </Typography>

        {isMobile ? (
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Box className="nav-links">
            {renderNavLinks()}
            {token && user ? (
              <>
                <Typography className="welcome-text">
                  Hello, {user.firstName}
                </Typography>
                <Button onClick={handleLogout} className="auth-button">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" className="auth-button">
                  Login
                </Button>
                <Button component={Link} to="/register" className="auth-button">
                  Register
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          <List>
            {navLinks.map((link) => (
              <ListItem
                button
                key={link.path}
                component={Link}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
            {token && user ? (
              <>
                <ListItem>
                  <ListItemText primary={`Hello, ${user.firstName}`} />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={Link} to="/login" onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/register"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
