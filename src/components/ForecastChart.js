import React from 'react';
import { Card, CardContent, Typography, Box, Paper, Avatar, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ForecastChart = ({ forecastData }) => {
  const theme = useTheme();
  
  if (!forecastData || !forecastData.list) {
    return null;
  }

  // Sort forecast data by date
  const sortedForecast = [...forecastData.list].sort((a, b) => a.dt - b.dt);

  // Extract temperature data for the next 5 days
  const days = [];
  const temps = [];
  
  // Get unique days from forecast data
  const uniqueDays = new Set();
  sortedForecast.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    if (!uniqueDays.has(day) && uniqueDays.size < 5) {
      uniqueDays.add(day);
      days.push(day);
      temps.push(item.main.temp);
    }
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.palette.text.primary,
        },
      },
      title: {
        display: true,
        text: '5-Day Temperature Forecast',
        color: theme.palette.text.primary,
      },
    },
    scales: {
      y: {
        grid: {
          color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme.palette.text.primary,
        },
      },
      x: {
        grid: {
          color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.02)',
        },
        ticks: {
          color: theme.palette.text.primary,
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
      },
      line: {
        tension: 0.3,
        borderWidth: 2,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const labels = forecastData.list.map(item => new Date(item.dt * 1000).toLocaleDateString());
  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecastData.list.map(item => item.main.temp),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        tension: 0.3,
        pointBackgroundColor: theme.palette.primary.main,
        pointBorderColor: theme.palette.primary.contrastText,
        pointHoverBackgroundColor: theme.palette.primary.dark,
        pointHoverBorderColor: theme.palette.primary.main,
      },
    ],
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
            📈
          </Avatar>
          <Typography variant="h4" component="div">
            5-Day Forecast
          </Typography>
        </Box>

        <Paper 
          elevation={3} 
          sx={{ 
            height: 400,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
            borderRadius: 2,
          }}
        >
          <Line options={options} data={data} />
        </Paper>
      </CardContent>
    </Card>
  );
};

export default ForecastChart;
