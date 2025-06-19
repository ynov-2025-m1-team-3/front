import { useState } from "react";
import { Box, TextField, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WarningIcon from "@mui/icons-material/Warning";
import logo from "../../assets/logo.png";
import SideDrawer from "@/components/SideDrawer";

const Navbar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(input);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        width: "90%",
        mx: "auto",
        mt: 0,
        mb: 4,
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 2,
      }}
    >
      <SideDrawer />
      <Box component="img" src={logo} alt="logo" sx={{ height: 30 }} />
      <Box sx={{ flex: 1, px: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Rechercher..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          InputProps={{
            endAdornment: <SearchIcon />,
            sx: {
              backgroundColor: "#fff",
              borderRadius: 1,
            },
          }}
        />
      </Box>

      <IconButton color="warning">
        <WarningIcon />
      </IconButton>
    </Paper>
  );
};

export default Navbar;
