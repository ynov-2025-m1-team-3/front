import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import background_homepage from "../../assets/bg-home.webp";

// Lazy loading du composant image
const LazyImage = lazy(() => import("../../components/common/LazyImage"));

// Styles cachés pour améliorer les performances
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    bgcolor: "#f5f5f5",
  },
  leftPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    px: 4,
  },
  title: {
    fontWeight: 700,
    color: "#20b4dc",
    fontSize: { xs: "2.5rem", md: "4rem" },
    fontFamily: "Roboto, sans-serif",
  },
  subtitle: {
    color: "#666",
    fontWeight: "lighter",
    mt: 1,
  },
  button: {
    mt: 4,
    px: 4,
    py: 1.5,
    borderRadius: 2,
    backgroundColor: "#20b4dc",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imageSkeleton: {
    width: "100%",
    height: "400px",
    borderRadius: "100px",
    backgroundColor: "#f0f0f0",
    backgroundImage:
      "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    "@keyframes shimmer": {
      "0%": { backgroundPosition: "200% 0" },
      "100%": { backgroundPosition: "-200% 0" },
    },
  },
};

const Landingpage = () => {
  const navigate = useNavigate();

  // Préchargement de la route login pour améliorer les performances
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "/login";
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.leftPanel}>
        <Typography variant="h2" sx={styles.title}>
          FeedPulse
        </Typography>

        <Typography variant="h6" sx={styles.subtitle}>
          Groupe 3
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={styles.button}
          onClick={() => navigate("/login")}
        >
          LOGIN
        </Button>
      </Box>

      <Box sx={styles.rightPanel}>
        <Suspense fallback={<Box sx={styles.imageSkeleton} />}>
          <LazyImage
            src={background_homepage}
            alt="Design inspiration"
            sx={{
              width: "100%",
              borderRadius: "100px",
            }}
            threshold={0.1}
          />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Landingpage;
