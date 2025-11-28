import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Button,
  Chip,
  Divider,
} from '@mui/material';

const featureCards = [
  {
    title: 'Lightning Cleaner',
    desc: 'Strip every hidden EXIF, IPTC, and XMP detail before sharing.',
    action: 'Clean Photos',
    path: '/cleaner',
  },
  {
    title: 'Deep Analyzer',
    desc: 'Reveal GPS trails, device fingerprints, and sensitive timestamps.',
    action: 'Analyze Metadata',
    path: '/analyzer',
  },
  {
    title: 'Learn & Defend',
    desc: 'Understand how metadata compromised people and how to stay safe.',
    action: 'Explore Trivia',
    path: '/trivia',
  },
];

function Home() {
  return (
    <Stack spacing={6}>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 5,
          background: 'linear-gradient(135deg, rgba(155,93,229,0.25), rgba(12,10,24,0.92))',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Chip
            label="Zero-trust Metadata Hygiene"
            color="secondary"
            variant="outlined"
            sx={{ alignSelf: { xs: 'flex-start', md: 'center' } }}
          />
          <Typography variant="h3" component="h1">
            Clean. Analyze. Outsmart metadata leaks.
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 640, textAlign: 'center', mx: 'auto' }}
          >
            StripClean delivers a ruthless metadata workflow—purge artifacts from any image,
            reverse-engineer the story they tell, and educate your team on how metadata has
            been weaponized in the wild.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/cleaner"
            >
              Start Cleaning
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/analyzer"
            >
              Run Analysis
            </Button>
          </Stack>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <Grid container spacing={3}>
            {['EXIF scrub', 'GPS purge', 'Device fingerprint checks'].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Typography variant="overline" color="secondary">
                  {item}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Instant
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Paper>

      <Grid container spacing={4}>
        {featureCards.map((card) => (
          <Grid item xs={12} md={4} key={card.title}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 4,
              }}
            >
              <Typography variant="overline" color="secondary">
                {card.title}
              </Typography>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {card.desc}
              </Typography>
              <Button
                component={RouterLink}
                to={card.path}
                variant="contained"
                color="primary"
              >
                {card.action}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default Home;
