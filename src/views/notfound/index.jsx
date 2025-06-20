import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NotFoundPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ 
      padding: "20px", 
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "0 auto",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#ff6b6b" }}>🚫 Page non trouvée (404)</h1>
      
      <div style={{ 
        backgroundColor: "#ffe6e6", 
        padding: "15px", 
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h2>Informations de debug :</h2>
        <p><strong>URL demandée:</strong> {location.pathname}</p>
        <p><strong>URL complète:</strong> {window.location.href}</p>
        <p><strong>User Agent:</strong> {navigator.userAgent}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Cette page peut vous aider à diagnostiquer :</h3>
        <ul style={{ textAlign: "left", maxWidth: "500px", margin: "0 auto" }}>
          <li>Si vous voyez cette page, React Router fonctionne</li>
          <li>Si vous ne la voyez pas, il y a un problème avec le serveur</li>
          <li>Les informations ci-dessus aident à déboguer</li>
        </ul>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
        <button 
          onClick={() => navigate("/")}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#4CAF50", 
            color: "white", 
            border: "none", 
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Aller à l'accueil
        </button>
        <button 
          onClick={() => navigate("/test")}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#2196F3", 
            color: "white", 
            border: "none", 
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Page de test
        </button>
        <button 
          onClick={() => window.history.back()}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#FF9800", 
            color: "white", 
            border: "none", 
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Retour
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
