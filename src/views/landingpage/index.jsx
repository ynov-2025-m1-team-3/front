import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" height="100vh" width="100%" bgcolor="#f5f5f5">
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        px={4}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: "#111",
            fontSize: {
              xs: "2.5rem",
              md: "4rem",
              color: "#20b4dc",
              fontWeight: "bold",
              fontFamily: "Roboto, sans-serif",
            },
          }}
        >
          FeedPulse
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: "#666", fontWeight: "lighter", mt: 1 }}
        >
          Groupe 3
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 4,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            backgroundColor: "#20b4dc",
          }}
          onClick={() => navigate("/register")}
        >
          LOGIN
        </Button>
      </Box>

      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="/bg-home.webp"
          alt="Design inspiration"
          loading="lazy"
          sx={{
            width: "100%",
            borderRadius: "100px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Landingpage;
