import { createTheme } from "@mui/material/styles";

// Configuration des couleurs principales
const colors = {
  primary: "#20b4dc",
  secondary: "#666",
  background: "#f5f5f5",
  text: {
    primary: "#111",
    secondary: "#666",
  },
};

// Configuration des breakpoints personnalisés
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

// Configuration de la typographie optimisée
const typography = {
  fontFamily: "Roboto, sans-serif",
  h2: {
    fontWeight: 700,
    fontSize: "4rem",
    "@media (max-width:900px)": {
      fontSize: "2.5rem",
    },
  },
  h6: {
    fontWeight: 400,
  },
};

// Configuration des composants avec optimisations
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        borderRadius: 8,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(32, 180, 220, 0.3)",
        },
      },
      contained: {
        backgroundColor: colors.primary,
        "&:hover": {
          backgroundColor: "#1a9bc4",
        },
      },
    },
  },
  MuiBox: {
    styleOverrides: {
      root: {
        // Optimisation pour éviter les reflows
        boxSizing: "border-box",
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        // Améliorer le rendu du texte
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
    },
  },
};

// Thème principal avec mise en cache
const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
    },
    text: colors.text,
  },
  breakpoints,
  typography,
  components,
  // Optimisations de performance
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
});

export default theme;
