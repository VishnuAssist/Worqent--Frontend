// src/layouts/AppLayout.tsx
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import BottomNav from "../components/BottomNav";

const AppLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar only for tablet & desktop */}
      {!isMobile && <Sidebar variant={isTablet ? "temporary" : "permanent"} />}

      <Box flex={1} display="flex" flexDirection="column">
        <Header />
        <Box component="main" p={2} overflow="auto" pb={isMobile ? 10 : 2}>
          <Outlet />
        </Box>
      </Box>

      {/* Bottom navigation only on mobile */}
      {isMobile && <BottomNav />}
    </Box>
  );
};

export default AppLayout;
