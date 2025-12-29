// src/layouts/AppLayout.tsx
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column">
        <Header />
        <Box component="main" p={3} overflow="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
