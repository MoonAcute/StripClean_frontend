import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';

const sections = [
  {
    title: 'What is metadata?',
    intro: 'Metadata describes the who/what/where of a file without touching the pixels.',
    bullets: [
      'EXIF: camera make, ISO, shutter, even lens serial numbers.',
      'IPTC: captions, bylines, newsroom workflows, copyright metadata.',
      'XMP: extensible packets used by Adobe + DAM tools for rich tagging.',
    ],
  },
  {
    title: 'How can it be weaponized?',
    intro: 'Seemingly harmless photos have leaked sensitive intel in these ways:',
    bullets: [
      'Location tracking: GPS trails expose home addresses and covert sites.',
      'Personal IDs: device serials link multiple images to a single shooter.',
      'Timeline leaks: timestamps reveal routines, deployments, or embargo breaks.',
    ],
  },
];

const history = [
  {
    label: 'Investigative journalism: tracing propaganda images via embedded EXIF trails (Bellingcat).',
    url: 'https://www.bellingcat.com/resources/how-tos/2014/07/14/a-beginners-guide-to-exif-data/',
  },
  {
    label: 'Law enforcement: kidnapping suspects located through hidden GPS (FBI case study).',
    url: 'https://www.fbi.gov/news/stories/cellular-phones-provide-evidence',
  },
  {
    label: 'Espionage: intelligence agencies correlating leaked photos to agent movements (NATO geotag warning).',
    url: 'https://www.nato.int/cps/en/natolive/opinions_76457.htm',
  },
  {
    label: 'Social media leaks: John McAfee outed by smartphone metadata published online.',
    url: 'https://www.wired.com/2012/12/john-mcafee-vice-metadata/',
  },
];

const questions = [
  'Do you remove GPS before sharing real-time event photos?',
  'Could your camera serial reveal other content you shot?',
  'Does your organization have a metadata sanitization policy?',
];

function Trivia() {
  return (
    <Stack spacing={4}>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 4, md: 5 },
          borderRadius: 5,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(135deg, rgba(15,15,22,1), rgba(90,24,154,0.2))',
        }}
      >
        <Stack spacing={2}>
          <Chip label="Intelligence Brief" color="primary" variant="outlined" />
          <Typography variant="h3">Metadata Trivia & Threat Briefing</Typography>
          <Typography variant="body1" sx={{ maxWidth: 720 }}>
            Metadata has exposed covert operations, compromised whistleblowers, and sparked viral doxxing incidents.
            Use this playbook to educate teams on exactly how those breaches happened.
          </Typography>
        </Stack>
      </Paper>

      <Grid container spacing={4}>
        {sections.map((section) => (
          <Grid item xs={12} md={6} key={section.title}>
            <Paper
              elevation={1}
              sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(255,255,255,0.06)', height: '100%' }}
            >
              <Typography variant="overline" color="secondary">
                {section.title}
              </Typography>
              <Typography variant="body1" sx={{ my: 2 }}>
                {section.intro}
              </Typography>
              <List dense>
                {section.bullets.map((bullet) => (
                  <ListItem key={bullet} disableGutters>
                    <ListItemText primary={bullet} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper
        elevation={1}
        sx={{ p: 4, borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <Typography variant="overline" color="secondary">
          Historical damage report
        </Typography>
        <Typography variant="h4" sx={{ my: 2 }}>
          When metadata burned people
        </Typography>
        <List>
          {history.map((item) => (
            <React.Fragment key={item.label}>
              <ListItem
                component="a"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                disableGutters
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.04)' },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Paper
        elevation={1}
        sx={{
          p: 4,
          borderRadius: 4,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(135deg, rgba(0,245,212,0.14), rgba(5,6,10,1))',
        }}
      >
        <Typography variant="overline" color="secondary">
          Self-audit questionnaire
        </Typography>
        <Typography variant="h4" sx={{ my: 2 }}>
          Could your workflow leak intel?
        </Typography>
        <List>
          {questions.map((q) => (
            <ListItem key={q} disableGutters>
              <ListItemText primary={q} />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Schedule team training
        </Button>
      </Paper>
    </Stack>
  );
}

export default Trivia;
