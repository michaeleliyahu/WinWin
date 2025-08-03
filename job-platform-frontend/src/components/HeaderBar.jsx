import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,

  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

import PillButton from "./PillButton"; // נניח שזה הנתיב הנכון אל הקומפוננטה
import "../styles/headerBar.css";

export default function HeaderBar() {
  const navigate = useNavigate();
  const [setDrawerOpen] = useState(false);
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

  // עכשיו יש רק קישור אחד: About
  const navLinks = [
    { label: "About", path: "/about" },
  ];

  const renderNavLinks = () =>
    navLinks.map((link) => (
      <PillButton
        key={link.path}
        label={link.label}
        variant="light"
        onClick={() => {
          navigate(link.path);
          setDrawerOpen(false);
        }}
      />
    ));

  return (
    <>
      <Box className="header-bar" sx={{ display: "flex", alignItems: "center", p: 1 }}>
        {/* הלוגו */}
        <Typography
          component={Link}
          to="/"
          className="logo"
          sx={{
            fontWeight: 700,
            fontSize: 32,
            fontFamily: '"Inter Variable", "Inter Placeholder", sans-serif',
            cursor: "pointer",
            userSelect: "none",
            flexShrink: 0,
            mr: 3,
            color: "black",
            textDecoration: "none",
          }}
        >
          CompanyHub®
        </Typography>

        {isMobile ? (
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {renderNavLinks()}

            {token && user ? (
              <>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 14,
                    fontFamily: '"Inter Variable", "Inter Placeholder", sans-serif',
                    userSelect: "none",
                    ml: 3,
                  }}
                >
                  Hello, {user.firstName}
                </Typography>

                <PillButton label="Logout" variant="dark" onClick={handleLogout} />
              </>
            ) : (
              <>
                <PillButton label="Login" variant="light" onClick={() => navigate("/login")} />
                <PillButton label="Register" variant="dark" onClick={() => navigate("/register")} />
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
