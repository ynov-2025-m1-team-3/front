import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Jsonpage = () => {
  const [fileName, setFileName] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/json") {
      setFileName(file.name);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/json") {
      setFileName(file.name);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          textAlign: "center",
          border: dragOver ? "2px dashed #20b4dc" : "2px dashed #ccc",
          transition: "border 0.2s ease-in-out",
          width: 400,
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <CloudUploadIcon color="primary" sx={{ color: "#20b4dc", fontSize: 48, mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Glissez-déposez votre fichier JSON ici
        </Typography>

        <Typography variant="body2" gutterBottom>
          ou
        </Typography>

        <Button variant="contained" component="label" sx={{ mt: 2, backgroundColor: "#20b4dc" }}>
          Sélectionner un fichier
          <input
            type="file"
            accept="application/json"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        {fileName && (
          <Typography mt={2} variant="body2" color="success.main">
            ✅ Fichier chargé : {fileName}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Jsonpage;