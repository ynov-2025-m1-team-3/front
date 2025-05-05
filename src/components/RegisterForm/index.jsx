import { Box, Button, TextField, Typography, Container } from "@mui/material";
import useRegister from "@hooks/useRegister";

const RegisterForm = () => {
  const { email, password, confirmPassword, error, setEmail, setPassword, setConfirmPassword, name, setName, handleSubmit } = useRegister()

  const textFieldStyle = {
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
          Inscription
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
            id="name"
            label="Name"
            autoComplete="username"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={textFieldStyle}
          />
          
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
          
          
          <Button
            type="submit"
            variant="contained"
            fullWidth 
            sx={{ 
              mt: 1,
              mb: 2,
              backgroundColor: "#20b4dc",
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