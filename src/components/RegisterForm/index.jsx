import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import "@fontsource/roboto";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Tous les champs sont requis!");
    } else if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas!");
    } else {
      setError("");
    }
  };

  const textFieldStyle = {
    fontFamily: "Roboto",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#ffffff",
      "& fieldset": {
        borderColor: "#20b4dc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#20b4dc",
      }
    },
    "& .MuiInputLabel-root": {
      color: "#20b4dc",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#20b4dc",
    },
    mb: 2
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          fontFamily: "Roboto",
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
          borderRadius: 7,
          boxShadow: 3,
          p: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#20b4dc" }}>
          Inscription
        </Typography>

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Prénom"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={textFieldStyle}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Nom"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={textFieldStyle}
            />
          </Box>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={textFieldStyle}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={textFieldStyle}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmer le mot de passe"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={textFieldStyle}
          />

          <Typography
            variant="body2"
            sx={{
              mt: 2,
              mb: 1,
              textAlign: "center",
              fontFamily: "Roboto",
              color: "black"
            }}
          >
            Déjà un compte ?{" "}
            <Link
              to="/login"
              style={{ color: "#20b4dc", textDecoration: "none", fontFamily: "Roboto" }}
            >
              Se connecter
            </Link>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              mb: 2,
              backgroundColor: "#20b4dc",
              fontFamily: "Roboto",
              "&:hover": { backgroundColor: "#1a8bbd" }
            }}
          >
            S'inscrire
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterForm;
