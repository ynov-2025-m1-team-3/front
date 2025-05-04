import { useState } from "react";
import api from "@lib/fetch";

const useUploadJson = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

    setLoading(true);
    setUploadProgress(10);
    setError(null);
    setSuccess(false);

    try {
      const dataToSend = Array.isArray(fileContent) ? fileContent : [fileContent];
      
      setUploadProgress(30);
      
      const response = await api.post("/api/feedback", dataToSend);
      
      setUploadProgress(100);
      setSuccess(true);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message || "Une erreur s'est produite lors de l'envoi des données");
      setLoading(false);
      setUploadProgress(0);
    }
  };

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