// src/layout/Topbar.tsx
import { AppBar, Toolbar, Typography } from "@mui/material";

const Topbar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Library Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
