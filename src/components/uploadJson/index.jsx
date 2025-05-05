import React from "react";
import { Box, Typography, Paper, Button, LinearProgress, Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import useUploadJson from "@hooks/useUploadJson";
import SideDrawer from "../../components/SideDrawer";


const Jsonpage = () => {
  const {
    loading,
    error,
    success,
    fileName,
    dragOver,
    uploadProgress,
    setDragOver,
    handleDrop,
    handleFileChange,
    uploadJson
  } = useUploadJson();

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

        <Button 
          variant="contained" 
          component="label" 
          sx={{ mt: 2, backgroundColor: "#20b4dc" }}
          disabled={loading}
        >
          Sélectionner un fichier
          <input
            type="file"
            accept="application/json"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        {fileName && (
          <Box mt={2}>
            <Typography variant="body2" color="success.main">
              ✅ Fichier chargé : {fileName}
            </Typography>
            
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={uploadJson}
              disabled={loading}
              sx={{ 
                mt: 2, 
                backgroundColor: "#20b4dc",
                "&:hover": { backgroundColor: "#1a8bbd" }
              }}
            >
              Envoyer à la base de données
            </Button>
          </Box>
        )}

        {loading && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Traitement en cours... {uploadProgress}%
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Données enregistrées avec succès dans la base de données!
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default Jsonpage;