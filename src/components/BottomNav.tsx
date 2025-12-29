// src/components/BottomNav.tsx
import {
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  return (
    <BottomNavigation
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
        navigate(newValue);
      }}
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: 72,
        zIndex: 20,
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Dashboard"
        value="/dashboard"
        icon={<DashboardIcon />}
      />
      <BottomNavigationAction
        label="Article"
        value="/article"
        icon={<ArticleIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
