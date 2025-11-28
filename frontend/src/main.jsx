import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { getTheme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';

const Root = () => {
  const [mode, setMode] = useState('dark');

  const theme = useMemo(() => getTheme(mode), [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggle: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App colorMode={colorMode} />
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
