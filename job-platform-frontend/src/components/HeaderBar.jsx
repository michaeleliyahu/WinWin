import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function HeaderBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Parse user object from localStorage
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#004aad" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
          }}
        >
          WinWin
        </Typography>

        <Box>
          {token && user ? (
            <>
              <Typography
                component="span"
                sx={{ mr: 2, fontWeight: "bold", color: "white" }}
              >
                Hello, {user.firstName} {user.lastName}
              </Typography>
              <Button
                onClick={handleLogout}
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{ mr: 2, textTransform: "none" }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
