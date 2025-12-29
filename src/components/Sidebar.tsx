// src/components/Sidebar.tsx
import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";

const collapsedWidth = 64;
const expandedWidth = 240;

const ALL_NAV_ITEMS = [
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
    icon: <DashboardIcon />,
    path: "/article",
    roles: ["ADMIN", "EMPLOYEE"],
  },
  {
    key: "employee_Management",
    label: "Employee Management",
    icon: <DashboardIcon />,
    path: "/employee_Management",
    roles: ["ADMIN"],
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const sidebarExpanded = useAppSelector((s) => s.ui.sidebarExpanded);
  const role = useAppSelector((s) => s.auth.user?.role); // 🔑 ROLE FROM AUTH
  const [hover] = useState(false);

  const effectiveExpanded = sidebarExpanded || hover;

  // 🔐 Filter menu by role
  const navItems = ALL_NAV_ITEMS.filter((item) =>
    role ? item.roles.includes(role) : false
  );

  return (
    <Box
      component="nav"
      sx={{
        width: effectiveExpanded ? expandedWidth : collapsedWidth,
        transition: "width 200ms ease",
        height: "100vh",
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        position: "sticky",
        top: 0,
        overflowX: "hidden",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={effectiveExpanded ? "space-between" : "center"}
        p={1}
      >
        <Typography variant="h6" noWrap>
          {effectiveExpanded ? "HR Web" : "HR"}
        </Typography>
      </Box>

      <Divider />

      <List>
        {navItems.map((item) => {
          const content = (
            <ListItemButton
              key={item.key}
              onClick={() => navigate(item.path)}
              sx={{
                py: 1.2,
                px: 2,
                minHeight: 44,
                justifyContent: effectiveExpanded ? "initial" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: effectiveExpanded ? 2 : 0,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {effectiveExpanded && <ListItemText primary={item.label} />}
            </ListItemButton>
          );

          return effectiveExpanded ? (
            content
          ) : (
            <Tooltip title={item.label} key={item.key} placement="right">
              {content}
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
