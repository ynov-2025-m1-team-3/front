import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import "../instrument.js"

// Gestion des erreurs de chunks (ChunkLoadError)
window.addEventListener("error", (event) => {
  if (event.error && event.error.name === "ChunkLoadError") {
    console.warn("Chunk load error detected, reloading page...");
    window.location.reload();
  }
});

// Gestion des promesses rejetées (chunks non chargés)
window.addEventListener("unhandledrejection", (event) => {
  if (event.reason && event.reason.toString().includes("Loading chunk")) {
    console.warn("Chunk loading rejected, reloading page...");
    event.preventDefault();
    window.location.reload();
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
