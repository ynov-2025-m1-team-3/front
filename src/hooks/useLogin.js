import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import api from "@lib/fetch";

const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Both fields are required!");
    } else {
      setError("");
    }

    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    console.log("response", response);
    if (response.error) {
      setError(response.error);
    } else {
      setError("");
    }

    if (response.token) {

      Cookies.set("token", response.token, {
        secure: true,
        sameSite: "Strict",
        expires: 7,
      });
      navigate("/upload-json");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};

export default useLogin;
