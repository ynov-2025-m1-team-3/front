// import { sentryVitePlugin } from "@sentry/vite-plugin"; // Temporairement désactivé
/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Sentry temporairement désactivé pour éviter les erreurs de build sur Render
    // sentryVitePlugin({
    //   org: "ynov-5h",
    //   project: "vite",
    // }),
    // sentryVitePlugin({
    //   org: "ynov-5h",
    //   project: "vite",
    //   authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
    // }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Configuration simplifiée pour éviter les erreurs de chunks
        manualChunks: {
          "vendor": ["react", "react-dom"],
          "router": ["react-router-dom"],
          "mui": ["@mui/material", "@mui/icons-material"],
          "mui-x": ["@mui/x-charts", "@mui/x-data-grid"],
        },
        // Assurer que les chunks ont des noms prévisibles
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      }
    }
  },
  
  // Configuration pour le serveur de développement
  server: {
    historyApiFallback: true,
  },
  
  // Configuration pour la preview
  preview: {
    port: 3000,
    host: true,
    historyApiFallback: true,
  },
});
