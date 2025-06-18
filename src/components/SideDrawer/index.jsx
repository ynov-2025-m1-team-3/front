import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CottageIcon from "@mui/icons-material/Cottage";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogin from "@/hooks/useLogin";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { logout } = useLogin();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const drawerItems = [
    { text: "Upload JSON", icon: <UploadFileIcon />, route: "/upload-json" },
    { text: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {drawerItems.map(({ text, icon, route }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(route);
                setOpen(false);
              }}
            >
              <ListItemIcon sx={{ color: "#20b4dc" }}>{icon}</ListItemIcon>
              <ListItemText primary={text} sx={{ color: "#20b4dc" }} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon sx={{ color: "#20b4dc" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "#20b4dc" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          color: "#20b4dc",
          ml: 1,
          visibility: open ? "hidden" : "visible",
        }}
        edge="start"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
