import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Avatar, useTheme, Paper } from '@mui/material';

const Recommendations = ({ recommendations }) => {
  const theme = useTheme();
  
  if (!recommendations) return null;

  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'clothing':
        return '👕';
      case 'activity':
        return '🏃‍♂️';
      case 'travel':
        return '🚗';
      default:
        return '✨';
    }
  };

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
    }}>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar 
            sx={{ 
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontSize: 24,
            }}
          >
            🎯
          </Avatar>
          <Typography variant="h4" component="div">
            Recommendations
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.light,
                    color: theme.palette.primary.main,
                    fontSize: 24,
                  }}
                >
                  {getIcon('clothing')}
                </Avatar>
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Clothing
                </Typography>
              </Box>
              <Typography 
                variant="body1" 
                component="div"
                sx={{ 
                  color: theme.palette.text.secondary,
                  lineHeight: 1.6,
                }}
              >
                {recommendations.clothing}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.light,
                    color: theme.palette.primary.main,
                    fontSize: 24,
                  }}
                >
                  {getIcon('activity')}
                </Avatar>
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Activity
                </Typography>
              </Box>
              <Typography 
                variant="body1" 
                component="div"
                sx={{ 
                  color: theme.palette.text.secondary,
                  lineHeight: 1.6,
                }}
              >
                {recommendations.activity}
              </Typography>
            </Paper>
          </Grid>
          {recommendations.travelAdvice && (
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 2,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.main,
                      fontSize: 24,
                    }}
                  >
                    {getIcon('travel')}
                  </Avatar>
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    Travel
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  component="div"
                  sx={{ 
                    color: theme.palette.text.secondary,
                    lineHeight: 1.6,
                  }}
                >
                  {recommendations.travelAdvice}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
