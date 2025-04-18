import { useState } from "react";
import { api } from "@lib/fetch";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    if (response.error) {
      setError(response.error);
    } else {
      setError("");
    }
    
    if (!email || !password) {
      setError("Both fields are required!");
    } else {
      setError("");
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
}

export default useLogin;