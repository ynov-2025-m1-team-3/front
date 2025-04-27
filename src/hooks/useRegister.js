import { useState } from "react";
import { redirect } from "react-router-dom";
import api from "@lib/fetch";

const useRegister = () => {
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
      await api.post("/auth/register", {
        name,
        email,
        password,
      });
      /**TODO : Message alert quand on se connecte avec toaster*/
      redirect("/login");
   }

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
    handleSubmit
   }
}

export default useRegister;