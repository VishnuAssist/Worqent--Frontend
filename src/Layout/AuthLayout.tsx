// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const AuthLayout = () => {
  return (
    <Box minHeight="100vh">
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
