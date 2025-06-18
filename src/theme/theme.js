import { createTheme } from '@mui/material/styles';

const createAppTheme = () => {
  const baseTheme = createTheme({
    palette: {
      primary: {
        main: '#2563eb',
        light: '#60a5fa',
        dark: '#1d4ed8',
      },
      secondary: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669',
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
      },
    },
    typography: {
      fontFamily: '"Inter", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
    },
  });

  return createTheme(baseTheme, {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(-1px)',
              transition: 'all 0.2s ease',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.8)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            '& .MuiToolbar-root': {
              padding: '0 24px',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.12)',
              },
              '&:hover fieldset': {
                borderColor: baseTheme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: baseTheme.palette.primary.main,
              },
            },
          },
        },
      },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 16,
    },
  });
};

const theme = createAppTheme();
export default theme;
