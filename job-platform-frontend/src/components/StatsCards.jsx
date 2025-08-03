import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Avatar
} from '@mui/material';
import { 
  People, 
  Description, 
  TrendingUp 
} from '@mui/icons-material';

export function StatsCards() {
  const stats = [
    {
      title: "Current Users",
      value: "127",
      change: "+12 this month",
      icon: People,
      iconColor: "#1976d2",
      iconBg: "#e3f2fd"
    },
    {
      title: "CVs Submitted",
      value: "2,847",
      change: "+156 this week",
      icon: Description,
      iconColor: "#7b1fa2",
      iconBg: "#f3e5f5"
    },
    {
      title: "Response Rate",
      value: "87%",
      change: "+12% improvement",
      icon: TrendingUp,
      iconColor: "#388e3c",
      iconBg: "#e8f5e8"
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4, paddingTop: 2 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card 
            elevation={0}
            sx={{ 
              p: 2,
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 3,
                '&:last-child': { pb: 3 },
                width: '100%'  // מוסיף
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 0.5 }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#388e3c' }}
                >
                  {stat.change}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: stat.iconBg,
                  borderRadius: 1.5
                }}
              >
                <stat.icon sx={{ color: stat.iconColor, fontSize: 24 }} />
              </Avatar>
            </CardContent>

          </Card>
        </Grid>
      ))}
    </Grid>
  );
}