// src/layout/AppLayout.tsx
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
