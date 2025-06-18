import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  Button, 
  Alert, 
  useTheme 
} from '@mui/material';
import { api } from '../api';

const VillageWeather = () => {
  const theme = useTheme();
  const [villageName, setVillageName] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [villageWeather, setVillageWeather] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVillageWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch village weather
      const weatherResponse = await api.get(`/api/weather/village?name=${villageName}`);
      setVillageWeather(weatherResponse.data);
      
      // Check for alerts
      const alertResponse = await api.get(`/api/weather/check-alert?name=${villageName}`);
      setAlert(alertResponse.data ? {
        type: 'warning',
        message: 'There is an active weather alert for this village'
      } : null);
    } catch (error) {
      console.error('Error fetching village weather:', error);
      setError('Failed to fetch village weather. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createAlert = async () => {
    if (!villageName || !email) {
      setError('Please enter village name and email');
      return;
    }

    const alertData = {
      alertType: 'Weather Alert',
      description: `Weather alert for ${villageName} in ${district}, ${state}`,
      startTime: new Date().toISOString(),
      endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      severity: 'High',
      email: email,
      isActive: true
    };

    try {
      const response = await api.post('/api/weather/alert', alertData);

      if (!response.ok) {
        throw new Error('Failed to create weather alert');
      }

      setAlert({
        type: 'success',
        message: 'Weather alert created and email notification sent'
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card sx={{
      height: '100%',
      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
      mb: 4
    }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          Village Weather
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Village Name"
                value={villageName}
                onChange={(e) => setVillageName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email for Alerts"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={fetchVillageWeather}
              disabled={loading}
            >
              Get Weather
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={createAlert}
              disabled={loading || !villageName || !email}
            >
              Create Alert
            </Button>
          </Box>
        </Box>

        {loading && (
          <Alert severity="info">Loading weather data...</Alert>
        )}

        {error && (
          <Alert severity="error">{error}</Alert>
        )}

        {alert && (
          <Alert severity={alert.type}>{alert.message}</Alert>
        )}

        {villageWeather && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Current Weather
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="body1">
                  Temperature: {villageWeather.temperature}°C
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body1">
                  Humidity: {villageWeather.humidity}%
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body1">
                  Wind Speed: {villageWeather.windSpeed} m/s
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default VillageWeather;
