import { useState, useEffect, useCallback } from "react";
import api from "@lib/fetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useData = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFeedbacks = useCallback(async () => {
    try {
      setLoading(true);
      
      // Vérifier si l"utilisateur est connecté
      const token = Cookies.get("token");
      if (!token) {
        setError("Vous devez être connecté pour voir les données");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }
      
      // Headers pour l"authentification
      const headers = {
        Authorization: `Bearer ${token}`
      };
      
      // Récupérer depuis localStorage ou API
      const localData = localStorage.getItem("uploadedFeedback");
      
      if (localData) {
        setFeedbacks(JSON.parse(localData));
      } else {
        const response = await api.get("/api/feedback", headers);
        setFeedbacks(response);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
      setError(err.message || "Une erreur est survenue lors de la récupération des données");
      setLoading(false);
    }
  }, [navigate]);

  // Charger les données au montage du composant
  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  // Fonction pour forcer le rafraîchissement des données
  const refreshFeedbacks = () => {
    // Supprimer les données en cache pour forcer l"appel API
    localStorage.removeItem("uploadedFeedback");
    fetchFeedbacks();
  };

  return {
    feedbacks,
    setFeedbacks,
    loading,
    setLoading,
    error,
    setError,
    fetchFeedbacks,
    refreshFeedbacks
  };
};

export default useData;