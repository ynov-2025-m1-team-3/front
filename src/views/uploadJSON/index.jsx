import Jsonpage from "../../components/uploadJson";
import { Typography, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../assets/logo.png";
const Uploadpage = () => {
  return (
    <Box>
      <img src={logo} alt="Logo" style={{ width: "200px", margin: "20px auto", display: "block" }} />
      <Typography
        variant="h4"
        align="center"
        sx={{ mt: 4, mb: 2, color: "#20b4dc", fontWeight: "bold"  ,fontFamily: "Roboto, sans-serif" }}
      >
        Bienvenue sur FeedPulse
      </Typography>

      <AccountCircleIcon color="primary" sx={{color: "#20b4dc", fontSize: 48, mb: 2 }} />
      {/* Ajouter l'username */}

      <Typography
        variant="h6"
        align="center"
        sx={{ mb: 4, color: "#333", fontFamily: "Roboto, sans-serif" }}
      >
        Téléchargez votre fichier JSON pour commencer à utiliser notre application.
        </Typography>


      <Jsonpage />
    </Box>
  );
};

export default Uploadpage;