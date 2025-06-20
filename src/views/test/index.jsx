import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TestPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ 
      padding: "20px", 
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      <h1>🧪 Page de Test - Diagnostic Routage</h1>
      
      <div style={{ 
        backgroundColor: "#f5f5f5", 
        padding: "15px", 
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h2>Informations de la route actuelle :</h2>
        <p><strong>Pathname:</strong> {location.pathname}</p>
        <p><strong>Search:</strong> {location.search}</p>
        <p><strong>Hash:</strong> {location.hash}</p>
        <p><strong>URL complète:</strong> {window.location.href}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Test de navigation :</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button 
            onClick={() => navigate("/")}
            style={{ padding: "10px 15px", margin: "5px" }}
          >
            Aller à /
          </button>
          <button 
            onClick={() => navigate("/login")}
            style={{ padding: "10px 15px", margin: "5px" }}
          >
            Aller à /login
          </button>
          <button 
            onClick={() => navigate("/register")}
            style={{ padding: "10px 15px", margin: "5px" }}
          >
            Aller à /register
          </button>
          <button 
            onClick={() => navigate("/dashboard")}
            style={{ padding: "10px 15px", margin: "5px" }}
          >
            Aller à /dashboard
          </button>
          <button 
            onClick={() => navigate("/test")}
            style={{ padding: "10px 15px", margin: "5px" }}
          >
            Rester sur /test
          </button>
        </div>
      </div>

      <div style={{ 
        backgroundColor: "#e8f5e8", 
        padding: "15px", 
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h2>✅ Test réussi !</h2>
        <p>Si vous voyez cette page, cela signifie que :</p>
        <ul>
          <li>Le routage React fonctionne</li>
          <li>La route /test est accessible</li>
          <li>Le fichier _redirects fonctionne sur Render</li>
        </ul>
      </div>

      <div style={{ 
        backgroundColor: "#fff3cd", 
        padding: "15px", 
        borderRadius: "8px",
        border: "1px solid #ffeaa7"
      }}>
        <h2>🔍 Instructions de test :</h2>
        <ol>
          <li>Testez cette URL directement : <code>https://votre-site.onrender.com/test</code></li>
          <li>Actualisez la page (F5) - elle devrait rester sur /test</li>
          <li>Utilisez les boutons ci-dessus pour tester la navigation</li>
          <li>Ouvrez les outils de développement (F12) pour voir les erreurs</li>
        </ol>
      </div>
    </div>
  );
}

export default TestPage;
