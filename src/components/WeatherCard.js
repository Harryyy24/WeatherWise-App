import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const WeatherCard = ({ weatherData }) => {
  const theme = useTheme();
  
  if (!weatherData) return null;

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'snow':
        return '❄️';
      case 'thunderstorm':
        return '⚡';
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
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          gap: 2,
        }}>
          <Avatar 
            sx={{ 
              fontSize: 32, 
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              width: 64,
              height: 64,
            }}
          >
            {getWeatherIcon(weatherData.weather[0].main)}
          </Avatar>
          <Box>
            <Typography variant="h4" component="div" gutterBottom>
              {weatherData.name}
            </Typography>
            <Typography variant="h3" component="div">
              {Math.round(weatherData.main.temp)}°C
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  fontSize: 16,
                }}
              >
                💧
              </Avatar>
              <Typography variant="body1">
                Humidity: {weatherData.main.humidity}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  fontSize: 16,
                }}
              >
                ⚡
              </Avatar>
              <Typography variant="body1">
                Pressure: {weatherData.main.pressure} hPa
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  fontSize: 16,
                }}
              >
                🌬️
              </Avatar>
              <Typography variant="body1">
                Wind: {weatherData.wind.speed} m/s
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  fontSize: 16,
                }}
              >
                🌡️
              </Avatar>
              <Typography variant="body1">
                Feels like: {Math.round(weatherData.main.feels_like)}°C
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
