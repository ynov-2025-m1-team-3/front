import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import "@fontsource/roboto"; // ✅ si tu l’as installé via npm

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Both fields are required!");
    } else {
      setError("");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          fontFamily: "Roboto",
          fontWeight: "bold", // ✅ tout le texte dans le conteneur est gras
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
        <Typography variant="h4" gutterBottom sx={{ color: "#20b4dc",  }}>
          Connexion
        </Typography>

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2, }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff",
                fontWeight: "bold", // champs en gras
                "& fieldset": {
                  borderColor: "#20b4dc",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#20b4dc",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#20b4dc",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#20b4dc",
              },
            }}
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff",
                "& fieldset": {
                  borderColor: "#20b4dc",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#20b4dc",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#20b4dc",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#20b4dc",
              },
            }}
          />

          <Typography
            variant="body2"
            sx={{
              mt: 2,
              mb: 1,
              textAlign: "center",
              color: "black",
            }}
          >
            Pas encore de compte ?{" "}
            <Link
              to="/register"
              style={{
                color: "#20b4dc",
                textDecoration: "none",
              }}
            >
              S'inscrire
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
              "&:hover": { backgroundColor: "#1a8bbd" },
            }}
          >
            Se connecter
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
