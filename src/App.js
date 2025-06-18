import React, { useState, useEffect } from 'react';
import { 
  ThemeProvider, 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  TextField, 
  Button, 
  Grid, 
  useMediaQuery, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Search, Refresh, Cloud, LocationOn } from '@mui/icons-material';

import WeatherCard from './components/WeatherCard';
import ForecastChart from './components/ForecastChart';
import Recommendations from './components/Recommendations';
import VillageWeather from './components/VillageWeather';

import { api } from './api';
import baseTheme from './theme/theme';

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherResponse, forecastResponse, recommendationsResponse] = await Promise.all([
        api.get(`/api/weather/current?city=${city}`),
        api.get(`/api/weather/forecast?city=${city}`),
        api.get(`/api/weather/recommendations?city=${city}`)
      ]);

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
      setRecommendations(recommendationsResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-fetch data when city changes
    if (city) {
      fetchWeather();
    }
  }, [city]);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: theme.palette.background.default
      }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              WeatherWise
            </Typography>
            <Button 
              color="inherit" 
              onClick={() => setDarkMode(!darkMode)}
              startIcon={darkMode ? <Cloud /> : <LocationOn />}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1 }} />,
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => fetchWeather()}
                    startIcon={<Search sx={{ fontSize: '1.5rem' }} />}
                    sx={{
                      px: 4,
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    Search
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <WeatherCard weatherData={weatherData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ForecastChart forecastData={forecastData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Recommendations recommendations={recommendations} />
            </Grid>
            <Grid item xs={12} md={6}>
              <VillageWeather />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
