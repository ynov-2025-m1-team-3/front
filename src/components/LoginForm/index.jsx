import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
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
      console.log("Email:", email);
      console.log("Mot de passe:", password);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
          borderRadius: 1,
          boxShadow: 3,
          p: 3,
        }}
      >
        <Typography variant="h3" gutterBottom sx={{color: "#20b4dc"}}>
          Connexion
        </Typography>

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
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
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ 
              mb: 2,
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
              }
            }}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ 
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
              }
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth 
            sx={{ 
              mt: 3,
              mb: 2,
              backgroundColor: "#20b4dc",
              "&:hover": { backgroundColor: "#1a8bbd" }
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