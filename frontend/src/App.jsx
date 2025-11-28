import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  IconButton,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Cleaner from './components/Cleaner';
import Analyzer from './components/Analyzer';
import Trivia from './components/Trivia';
import Home from './components/Home';

const Navigation = ({ colorMode }) => {
  const { pathname } = useLocation();
  const isDark = colorMode?.mode === 'dark';
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Cleaner', path: '/cleaner' },
    { label: 'Analyzer', path: '/analyzer' },
    { label: 'Trivia', path: '/trivia' },
  ];

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar sx={{ py: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          StripClean
        </Typography>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={RouterLink}
              to={item.path}
              variant={pathname === item.path ? 'contained' : 'outlined'}
              color={pathname === item.path ? 'primary' : 'secondary'}
            >
              {item.label}
            </Button>
          ))}
          <IconButton
            color="inherit"
            onClick={colorMode?.toggle}
            aria-label="Toggle light/dark mode"
            sx={{ ml: 1 }}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

function AppContent({ colorMode }) {
  return (
    <>
      <Navigation colorMode={colorMode} />
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          py: 6,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at top, rgba(108,99,255,0.18), transparent 55%)'
              : 'radial-gradient(circle at top, rgba(88,80,255,0.16), transparent 55%)',
        }}
      >
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cleaner" element={<Cleaner />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/trivia" element={<Trivia />} />
          </Routes>
        </Container>
      </Box>
    </>
  );
}

function App({ colorMode }) {
  return (
    <Router>
      <AppContent colorMode={colorMode} />
    </Router>
  );
}

export default App;
