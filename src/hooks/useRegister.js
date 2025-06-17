import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "@lib/fetch";
import Cookies from "js-cookie";

const useRegister = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Tous les champs sont requis!");
    } else if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas!");
    } else {
      setError("");
    }
    try {
      const response = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });
      if (response.token) {
        Cookies.set("token", response.token, {
          secure: false,
          sameSite: "Lax",
          expires: 7,
          path: "/",
        });
        navigate("/upload-json");
        toast.success("user registered");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    name,
    setName,
    handleSubmit,
  };
};

export default useRegister;
