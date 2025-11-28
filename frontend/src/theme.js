import { createTheme } from '@mui/material/styles';

// Base palette for the "previous" indigo / aqua look
const baseColorsDark = {
  primary: '#6c63ff',
  primaryDark: '#3f31e0',
  secondary: '#5ce1e6',
  background: '#05050b',
  surface: '#101225',
  accent: '#1a1c2f',
};

const baseColorsLight = {
  primary: '#5850ff',
  primaryDark: '#3f31e0',
  secondary: '#00c4b8',
  background: '#f5f6ff',
  surface: '#ffffff',
  accent: '#e3e5ff',
};

export const getTheme = (mode = 'dark') => {
  const base = mode === 'dark' ? baseColorsDark : baseColorsLight;

  return createTheme({
    palette: {
      mode,
      primary: {
        main: base.primary,
        dark: base.primaryDark,
      },
      secondary: {
        main: base.secondary,
      },
      background: {
        default: base.background,
        paper: base.surface,
      },
      divider: mode === 'dark'
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(15, 23, 42, 0.12)',
      text: mode === 'dark'
        ? {
            primary: '#f4f6fb',
            secondary: 'rgba(244, 246, 251, 0.7)',
          }
        : {
            primary: '#111827',
            secondary: 'rgba(15, 23, 42, 0.7)',
          },
    },
    typography: {
      fontFamily: 'Space Grotesk, Inter, Roboto, sans-serif',
      h3: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h4: {
        fontWeight: 600,
      },
      body1: {
        lineHeight: 1.7,
      },
    },
    shape: {
      borderRadius: 18,
    },
    shadows: [
      'none',
      '0px 10px 30px rgba(0, 0, 0, 0.18)',
      '0px 20px 40px rgba(15, 23, 42, 0.18)',
    ],
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: `linear-gradient(90deg, ${base.primaryDark}, ${base.primary})`,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: base.surface,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: '0.04em',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            borderRadius: 999,
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'lg',
        },
      },
    },
  });
};

// Default export keeps existing imports working (dark mode by default)
const theme = getTheme('dark');
export default theme;
