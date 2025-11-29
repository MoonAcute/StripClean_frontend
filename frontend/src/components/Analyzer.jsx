import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Stack,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Analyzer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMetadata(null); // Clear previous metadata when a new file is selected
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setIsAnalyzing(true);
      // Replace with your actual backend endpoint for analyzing metadata
      const response = await fetch("/analyze", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMetadata(data);
      } else {
        alert("Failed to analyze metadata.");
      }
    } catch (error) {
      console.error("Error analyzing metadata:", error);
      alert("Error analyzing metadata.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <Paper
          elevation={2}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 5,
            border: "1px solid rgba(255,255,255,0.08)",
            background:
              "linear-gradient(135deg, rgba(0,245,212,0.24), rgba(5,6,10,0.95))",
          }}
        >
          <Stack spacing={3}>
            <Chip
              label="Step 2 · Analyze"
              color="secondary"
              variant="filled"
              sx={{ alignSelf: "flex-start" }}
            />
            <Typography variant="h3" component="h2">
              Expose every hidden coordinate and signature.
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 660 }}>
              Inspect embedded EXIF, IPTC, and XMP payloads before attackers do.
              Instantly audit what a photo can reveal about devices, people, and
              locations.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ minWidth: 220 }}
              >
                {selectedFile ? selectedFile.name : "Upload image"}
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
              >
                {isAnalyzing ? "Crunching data…" : "Analyze Metadata"}
              </Button>
            </Stack>

            <Grid container spacing={3}>
              {[
                { label: "GPS trails", status: "Detected" },
                { label: "Camera fingerprints", status: "Flagged" },
                { label: "Timestamps", status: "Decoded" },
              ].map((item) => (
                <Grid item xs={12} md={4} key={item.label}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      textAlign: "center",
                      backgroundColor: "rgba(30,31,41,0.8)",
                    }}
                  >
                    <Typography variant="overline" color="secondary">
                      {item.label}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {item.status}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Paper>

        {metadata && (
          <Paper
            elevation={1}
            sx={{
              p: 4,
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Metadata Analysis Report
            </Typography>

            {/* Summary Chips */}
            <Stack direction="row" spacing={2} my={3}>
              <Chip
                label={`${metadata.summary?.critical || 0} Critical`}
                color="error"
                size="medium"
              />
              <Chip
                label={`${metadata.summary?.warning || 0} Warning`}
                color="warning"
                size="medium"
              />
              <Chip
                label={`${metadata.summary?.safe || 0} Safe`}
                color="success"
                size="medium"
              />
            </Stack>

            {!metadata.metadata || metadata.metadata.length === 0 ? (
              <Typography color="success.main" variant="h6">
                No metadata found – This image is completely clean!
              </Typography>
            ) : (
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Tag</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Value</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Risk Level</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metadata.metadata.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <code style={{ fontSize: "0.9em" }}>{item.tag}</code>
                        </TableCell>
                        <TableCell
                          sx={{ maxWidth: 500, wordBreak: "break-word" }}
                        >
                          {item.value}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={item.threat.toUpperCase()}
                            color={
                              item.threat === "critical"
                                ? "error"
                                : item.threat === "warning"
                                  ? "warning"
                                  : "success"
                            }
                            size="small"
                            sx={{ minWidth: 80 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        )}
      </Stack>
    </Container>
  );
}

export default Analyzer;
