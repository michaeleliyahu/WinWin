import React from 'react';
import { 
  ThemeProvider, 
  createTheme,
  CssBaseline,
  Box
} from '@mui/material';
import { CompanySearchPage } from './pages/CompanySearchPage';
import CompanyPage from './pages/CompanyPage';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
// Create a custom theme to match the design
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
          },
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box 
      sx={{
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '2rem',
        }}>
        <Routes>
          <Route path="/" element={<CompanySearchPage />} />
          <Route path="/company/:id" element={<CompanyPage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}