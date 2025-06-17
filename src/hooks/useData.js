import { useState, useEffect } from "react";
import api from "@lib/fetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { SentryLogger } from "@/lib/sentryLogger";

const useData = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fonction pour filtrer les données indésirables
  const filterUnwantedData = (data) => {
    if (!Array.isArray(data)) return data;
    
    return data.filter(item => {
      // Vérifier si c'est un objet valide
      if (!item || typeof item !== "object") return false;
      
      // Filtrer les ressources script
      if (item.resource && item.resource.includes("script")) return false;
      
      // Filtrer les ressources CSS
      if (item.resource && item.resource.includes("stylesheet")) return false;
      
      // Filtrer les ressources d'images système
      if (item.resource && /\.(ico|png|jpg|jpeg|gif|svg)$/i.test(item.resource)) return false;
      
      // Filtrer les requêtes de monitoring/analytics
      if (item.url && /analytics|tracking|monitor|beacon/i.test(item.url)) return false;
      
      // Filtrer les objets vides ou sans propriétés essentielles
      if (!item.text && !item.content && !item.message && !item.comment) return false;
      
      // Filtrer les données avec des caractères HTML suspects
      if (item.text && /<\/?[a-z][\s\S]*>/i.test(item.text)) return false;
      
      return true;
    });
  };

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      SentryLogger.logInfo("Starting feedbacks fetch", { 
        component: "useData",
        timestamp: new Date().toISOString()
      });
      
      // Vérifier si l'utilisateur est connecté
      const token = Cookies.get("token");
      if (!token) {
        const errorMsg = "Vous devez être connecté pour voir les données";
        
        SentryLogger.logWarning("User not authenticated", {
          component: "useData",
          action: "fetch_feedbacks",
          redirect_target: "/login"
        });
        
        setError(errorMsg);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }
      
      // Headers pour l'authentification
      const headers = {
        Authorization: `Bearer ${token}`
      };
      
      SentryLogger.logInfo("Making API request", {
        component: "useData",
        endpoint: "/api/feedback",
        has_token: !!token,
        token_length: token ? token.length : 0
      });
      
      // Récupérer directement depuis l'API
      const response = await api.get("/api/feedback", headers);
      
      // Valider la réponse
      if (!response) {
        throw new Error("Réponse API vide");
      }
      
      // Vérifier si c'est un tableau
      let feedbacksData = Array.isArray(response) ? response : (response.data || response.feedbacks || []);
      
      // Filtrer les données indésirables
      const originalCount = feedbacksData.length;
      feedbacksData = filterUnwantedData(feedbacksData);
      const filteredCount = feedbacksData.length;
      
      setFeedbacks(feedbacksData);
      
      SentryLogger.logInfo("Feedbacks loaded and filtered successfully", {
        component: "useData",
        original_count: originalCount,
        filtered_count: filteredCount,
        filtered_out: originalCount - filteredCount,
        response_type: typeof response,
        is_array: Array.isArray(response),
        first_feedback_keys: feedbacksData.length > 0 ? Object.keys(feedbacksData[0]) : []
      });
      
      setLoading(false);
      
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
      
      const errorMessage = err.message || "Une erreur est survenue lors de la récupération des données";
      
      // Déterminer le type d'erreur
      let errorType = "unknown";
      if (err.message?.includes("Unexpected token")) {
        errorType = "json_parse_error";
      } else if (err.message?.includes("fetch")) {
        errorType = "network_error";
      } else if (err.message?.includes("401") || err.message?.includes("Unauthorized")) {
        errorType = "auth_error";
      } else if (err.message?.includes("404")) {
        errorType = "not_found_error";
      } else if (err.message?.includes("500")) {
        errorType = "server_error";
      }
      
      SentryLogger.logApiError("/api/feedback", err, {
        component: "useData",
        action: "fetch_feedbacks",
        error_type: errorType,
        has_token: !!Cookies.get("token"),
        is_html_response: err.message?.includes("<!doctype") || err.message?.includes("<html"),
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        url: window.location.href
      });
      
      // Gestion spécifique des erreurs d'authentification
      if (errorType === "auth_error") {
        SentryLogger.logWarning("Authentication failed, redirecting to login", {
          component: "useData",
          action: "auth_redirect"
        });
        
        Cookies.remove("token");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        setError("Session expirée. Redirection vers la page de connexion...");
      } else {
        setError(errorMessage);
      }
      
      setLoading(false);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    SentryLogger.logInfo("useData hook mounted", {
      component: "useData",
      timestamp: new Date().toISOString()
    });
    
    fetchFeedbacks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fonction pour rafraîchir les données
  const refreshFeedbacks = () => {
    SentryLogger.logUserAction("refresh_feedbacks", "useData", {
      manual_refresh: true
    });
    fetchFeedbacks();
  };

  return {
    feedbacks,
    loading,
    error,
    refreshFeedbacks
  };
};

export default useData;