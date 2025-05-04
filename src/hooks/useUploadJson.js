<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@lib/fetch";
import Cookies from "js-cookie";

const useUploadJson = () => {
  const navigate = useNavigate();
=======
import { useState } from "react";
import api from "@lib/fetch";

const useUploadJson = () => {
>>>>>>> 538100b (feature upload json + fix route)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
<<<<<<< HEAD
  
  // Check for authentication when component mounts
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setError("Vous devez être connecté pour télécharger des données");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [navigate]);
=======
>>>>>>> 538100b (feature upload json + fix route)

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setUploadProgress(0);
  };

  const handleFileRead = (file) => {
    resetState();
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = JSON.parse(e.target.result);
        setFileContent(content);
      } catch (err) {
        setError("Erreur: Le fichier n'est pas un JSON valide" , err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/json") {
      handleFileRead(file);
    } else {
      setError("Erreur: Veuillez sélectionner un fichier JSON valide");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/json") {
      handleFileRead(file);
    } else if (file) {
      setError("Erreur: Veuillez sélectionner un fichier JSON valide");
    }
  };

  const uploadJson = async () => {
    if (!fileContent) {
      setError("Aucun fichier à envoyer");
      return;
    }

<<<<<<< HEAD
    // Check for authentication token
    const token = Cookies.get("token");
    console.log("Token:", token);
    if (!token) {
      setError("Vous devez être connecté pour télécharger des données");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

=======
>>>>>>> 538100b (feature upload json + fix route)
    setLoading(true);
    setUploadProgress(10);
    setError(null);
    setSuccess(false);

    try {
      const dataToSend = Array.isArray(fileContent) ? fileContent : [fileContent];
      
      setUploadProgress(30);
      
<<<<<<< HEAD
      // Add token to request headers
      const headers = {
        Authorization: `Bearer ${token}`
      };
      
      const response = await api.post("/api/feedback", dataToSend, headers);
=======
      const response = await api.post("/api/feedback", dataToSend);
>>>>>>> 538100b (feature upload json + fix route)
      
      setUploadProgress(100);
      setSuccess(true);
      setLoading(false);
<<<<<<< HEAD
      
      // Store data in localStorage for homepage display
      localStorage.setItem("uploadedFeedback", JSON.stringify(response));
      
      return response;
    } catch (err) {
      console.error("Upload error:", err);
=======
      return response;
    } catch (err) {
>>>>>>> 538100b (feature upload json + fix route)
      setError(err.message || "Une erreur s'est produite lors de l'envoi des données");
      setLoading(false);
      setUploadProgress(0);
    }
  };

<<<<<<< HEAD
  // Return all your states and functions
=======
>>>>>>> 538100b (feature upload json + fix route)
  return {
    loading,
    error,
    success,
    fileName,
    fileContent,
    dragOver,
    uploadProgress,
    setDragOver,
    handleDrop,
    handleFileChange,
    uploadJson
  };
};

export default useUploadJson;