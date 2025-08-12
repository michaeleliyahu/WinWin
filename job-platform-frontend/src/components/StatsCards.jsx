import React from 'react';
import { 
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
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: { xs: 2, sm: 3 },
        mb: { xs: 2, sm: 4 },
        pt: { xs: 1, sm: 2 },
        justifyContent: 'center',
      }}
    >
      {stats.map((stat, index) => (
        <Box
          key={index}
          sx={{
            flex: { xs: '1 1 100%', sm: '1 1 300px' },
            minWidth: { xs: '90vw', sm: 280 },
            maxWidth: { xs: '100vw', sm: 400 },
            px: { xs: 0},
          }}
        >
          <Card
            elevation={0}
            sx={{
              p: { xs: 1, sm: 2 },
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              height: '100%',
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: { xs: 2, sm: 3 },
                '&:last-child': { pb: { xs: 2, sm: 3 } },
                width: '100%',
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: { xs: 0.25, sm: 0.5 }, fontSize: { xs: 14, sm: 16 } }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: { xs: 0.25, sm: 0.5 },
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#388e3c', fontSize: { xs: 13, sm: 15 } }}
                >
                  {stat.change}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  width: { xs: 36, sm: 48 },
                  height: { xs: 36, sm: 48 },
                  backgroundColor: stat.iconBg,
                  borderRadius: 1.5,
                  ml: { xs: 1, sm: 0 },
                }}
              >
                <stat.icon sx={{ color: stat.iconColor, fontSize: { xs: 20, sm: 24 } }} />
              </Avatar>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}
