import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Alert,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Lock,
  Google
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../services/userService';
import { useUserStore } from '../store/useUserStore';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#666666',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      try {
        const data = await loginUser({ email: formData.email, password: formData.password });
        setUser(data.user);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("token_type", data.token_type);
        navigate("/");
      } catch (error) {
        setSubmitMessage(
          error?.response?.data?.detail ||
          error?.message ||
          "Login failed. Please check your credentials and try again."
        );
      }
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google/login`;
  };

  const handleForgotPassword = () => {
    setSubmitMessage('Password reset would be implemented here');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
          p: 2
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: '100%',
            boxShadow: 3,
            borderRadius: 3
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Lock Icon */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <Box
                sx={{
                  bgcolor: '#1976d2',
                  borderRadius: 2,
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Lock sx={{ color: 'white', fontSize: 24 }} />
              </Box>
            </Box>

            {/* Header */}
            <Typography
              variant="h4"
              component="h1"
              textAlign="center"
              sx={{ mb: 1, fontWeight: 600 }}
            >
              Welcome back
            </Typography>
            
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Sign in to your account
            </Typography>

            {/* Success/Error Message */}
            {submitMessage && (
              <Alert severity="info" sx={{ mb: 3 }}>
                {submitMessage}
              </Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {/* Email Field */}
              <TextField
                fullWidth
                label="Email address"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ mb: 3 }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={formData.password}
                onChange={handleInputChange('password')}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 3 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.rememberMe}
                      onChange={handleInputChange('rememberMe')}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleForgotPassword();
                  }}
                  sx={{ textDecoration: 'none' }}
                >
                  Forgot password?
                </Link>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mb: 3,
                  bgcolor: '#1976d2',
                  '&:hover': {
                    bgcolor: '#1565c0'
                  },
                  textTransform: 'none',
                  py: 1.5
                }}
              >
                Sign in
              </Button>

              {/* Divider */}
              <Box sx={{ mb: 3 }}>
                <Divider>
                  <Typography variant="body2" color="text.secondary">
                    Or continue with
                  </Typography>
                </Divider>
              </Box>

              {/* Google Button */}
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleGoogleAuth}
                startIcon={<Google />}
                sx={{
                  mb: 3,
                  textTransform: 'none',
                  py: 1.5,
                  borderColor: '#e0e0e0',
                  color: '#666',
                  '&:hover': {
                    borderColor: '#ccc',
                    bgcolor: '#f9f9f9'
                  }
                }}
              >
                Continue with Google
              </Button>

              {/* Sign Up Link */}
              <Typography variant="body2" textAlign="center" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/register');
                  }}
                  sx={{ textDecoration: 'none', fontWeight: 500 }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}