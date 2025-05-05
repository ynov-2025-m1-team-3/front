import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import FeedbackTable from "../../components/data/rowData";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import logo from "../../assets/logo.png";
import SideDrawer from "../../components/SideDrawer";

const Homepage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <img src={logo} alt="Logo" style={{ width: "200px", margin: "20px auto", display: "block" }} />
        <Typography variant="h4" gutterBottom sx={{ color: "#20b4dc", fontWeight: "bold" }}>
          Tableau de bord FeedPulse
        </Typography>

              <Box
          sx={{ position: "fixed", top: 16, left: 16,}}>
          <SideDrawer />
        </Box>
        
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button 
            component={Link} 
            to="/upload-json" 
            variant="contained" 
            startIcon={<UploadFileIcon />}
            sx={{ backgroundColor: "#20b4dc", "&:hover": { backgroundColor: "#1a8bbd" } }}
          >
            Uploader un nouveau fichier
          </Button>
        </Box>
        
        <FeedbackTable />
      </Box>
    </Container>
  );
};

export default Homepage;