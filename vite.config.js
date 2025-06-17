import { sentryVitePlugin } from "@sentry/vite-plugin";
/* eslint-disable no-undef */
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "ynov-5h",
    project: "vite"
  }), sentryVitePlugin({
    org: "ynov-5h",
    project: "vite",
    authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
  })],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    }
  },

  build: {
    sourcemap: true
  }
})