import { useState, useEffect } from "react";
import api from "@lib/fetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useData = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      
      // Vérifier si l'utilisateur est connecté
      const token = Cookies.get("token");
      if (!token) {
        setError("Vous devez être connecté pour voir les données");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }
      
      // Headers pour l'authentification
      const headers = {
        Authorization: `Bearer ${token}`
      };
      
      // Récupérer directement depuis l'API (plus de localStorage)
      const response = await api.get("/api/feedback", headers);
      setFeedbacks(response);
      
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
      setError(err.message || "Une erreur est survenue lors de la récupération des données");
      setLoading(false);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    fetchFeedbacks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fonction pour rafraîchir les données
  const refreshFeedbacks = () => {
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