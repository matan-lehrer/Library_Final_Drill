// src/layout/Sidebar.tsx
import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 220, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/students">
          <ListItemText primary="Students" />
        </ListItemButton>

        <ListItemButton component={Link} to="/books">
          <ListItemText primary="Books" />
        </ListItemButton>

        <ListItemButton component={Link} to="/loans">
          <ListItemText primary="Loans" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
