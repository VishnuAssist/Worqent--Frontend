import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../hooks";
import { setSidebarExpanded } from "../store/uiSlice";

/* ------------------------------------------------------------------ */
/* CONFIG */
/* ------------------------------------------------------------------ */

const COLLAPSED_WIDTH = 64;
const EXPANDED_WIDTH = 240;

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
    roles: ["ADMIN", "EMPLOYEE"],
  },
  {
    key: "article",
    label: "Article",
    icon: <ArticleIcon />,
    path: "/article",
    roles: ["ADMIN", "EMPLOYEE"],
  },
  {
    key: "employee_Management",
    label: "Employee Management",
    icon: <PeopleIcon />,
    path: "/employee_Management",
    roles: ["ADMIN"],
  },
];

/* ------------------------------------------------------------------ */
/* SIDEBAR */
/* ------------------------------------------------------------------ */

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const role = useAppSelector((s) => s.auth.user?.role);
  const sidebarExpanded = useAppSelector((s) => s.ui.sidebarExpanded);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  /* Filter menu by role */
  const navItems = NAV_ITEMS.filter((item) =>
    role ? item.roles.includes(role) : false
  );

  /* Close drawer after navigation (tablet) */
  const handleNavigate = (path: string) => {
    navigate(path);
    if (isTablet) {
      dispatch(setSidebarExpanded(false));
    }
  };

  /* ------------------------------------------------------------------ */
  /* CONTENT */
  /* ------------------------------------------------------------------ */

  const content = (
    <Box
      sx={{
        width: sidebarExpanded || isTablet ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        height: "100%",
        bgcolor: "background.paper",
        overflowX: "hidden",
      }}
    >
      {/* LOGO */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent={
          sidebarExpanded || isTablet ? "space-between" : "center"
        }
        px={2}
        py={1.5}
      >
        <Typography variant="h6" noWrap>
          {sidebarExpanded || isTablet ? "HR Web" : "HR"}
        </Typography>
      </Box>

      <Divider />

      {/* MENU */}
      <List>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          const button = (
            <ListItemButton
              key={item.key}
              selected={isActive}
              onClick={() => handleNavigate(item.path)}
              sx={{
                minHeight: 44,
                px: 2,
                justifyContent:
                  sidebarExpanded || isTablet ? "flex-start" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarExpanded || isTablet ? 2 : 0,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {(sidebarExpanded || isTablet) && (
                <ListItemText primary={item.label} />
              )}
            </ListItemButton>
          );

          return sidebarExpanded || isTablet ? (
            button
          ) : (
            <Tooltip title={item.label} placement="right" key={item.key}>
              {button}
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );

  /* ------------------------------------------------------------------ */
  /* TABLET → DRAWER */
  /* ------------------------------------------------------------------ */

  if (isTablet) {
    return (
      <Drawer
        open={sidebarExpanded}
        onClose={() => dispatch(setSidebarExpanded(false))}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
      >
        {content}
      </Drawer>
    );
  }

  /* ------------------------------------------------------------------ */
  /* DESKTOP → PERMANENT */
  /* ------------------------------------------------------------------ */

  return (
    <Box
      component="nav"
      sx={{
        width: sidebarExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        transition: "width 200ms ease",
        height: "100vh",
        borderRight: 1,
        borderColor: "divider",
        position: "sticky",
        top: 0,
      }}
    >
      {content}
    </Box>
  );
};

export default Sidebar;
