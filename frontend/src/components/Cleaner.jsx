import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Stack,
  Grid,
  Chip,
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

function Cleaner() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [cleanedImageUrl, setCleanedImageUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setCleanedImageUrl(null); // Clear previous image when a new file is selected
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setIsProcessing(true);
      // Replace with your actual backend endpoint for cleaning metadata
      const response = await fetch("/clean", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        setCleanedImageUrl(URL.createObjectURL(blob));
      } else {
        alert("Failed to clean metadata.");
      }
    } catch (error) {
      console.error("Error cleaning metadata:", error);
      alert("Error cleaning metadata.");
    } finally {
      setIsProcessing(false);
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
              "linear-gradient(135deg, rgba(90,24,154,0.26), rgba(5,6,10,0.95))",
          }}
        >
          <Stack spacing={3} alignItems="flex-start">
            <Chip label="Step 1 · Clean" color="primary" variant="filled" />
            <Typography variant="h3" component="h2">
              Vaporize hidden metadata from any image.
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 640 }}>
              Drag a file or tap upload. StripClean surgically removes GPS
              trails, device IDs, and forensic breadcrumbs while preserving
              pixel-perfect fidelity.
            </Typography>

            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
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
                onClick={handleUpload}
                disabled={!selectedFile || isProcessing}
              >
                {isProcessing ? "Processing…" : "Clean Metadata"}
              </Button>
            </Stack>

            <Grid container spacing={3}>
              {["EXIF", "IPTC", "XMP"].map((tag) => (
                <Grid item xs={12} sm={4} key={tag}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      textAlign: "center",
                      backgroundColor: "rgba(30,31,41,0.8)",
                      borderRadius: 3,
                    }}
                  >
                    <Typography variant="overline" color="secondary">
                      {tag} Fields
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Purged
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Paper>

        {cleanedImageUrl && (
          <Paper
            elevation={1}
            sx={{
              p: 4,
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography variant="h5" component="h3" gutterBottom>
              Cleaned image preview
            </Typography>
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={cleanedImageUrl}
                alt="Cleaned"
                style={{ width: "100%", display: "block" }}
              />
            </Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Button
                variant="contained"
                color="primary"
                href={cleanedImageUrl}
                download="cleaned_image.jpg"
              >
                Download Cleaned Image
              </Button>
              <Button variant="text" onClick={() => setCleanedImageUrl(null)}>
                Clear Preview
              </Button>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}

export default Cleaner;
