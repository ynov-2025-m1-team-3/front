import { useState, useEffect, useCallback } from "react";
import api from "@lib/fetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      
      // Vérifier si l"utilisateur est connecté
      const token = Cookies.get("token");
      if (!token) {
        setError("Vous n'êtes pas connecté");
        setLoading(false);
        return;
      }
      
      // Headers pour l"authentification
      const headers = {
        Authorization: `Bearer ${token}`
      };
      
      const response = await api.get("/api/auth/me", headers);
      setUser(response.user);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération du profil:", err);
      setError(err.message || "Une erreur est survenue lors de la récupération du profil");
      setLoading(false);
      
      // Si le token est invalide, rediriger vers la page de connexion
      if (err.message?.includes("Invalid token") || err.message?.includes("Authentication required")) {
        Cookies.remove("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  // Charger les données utilisateur au montage du composant
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // Fonction pour se déconnecter
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/login");
  };

  return {
    user,
    loading,
    error,
    logout,
    refreshUser: fetchCurrentUser
  };
};

export default useUser;