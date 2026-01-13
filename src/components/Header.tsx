// src/components/Header.tsx
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Tooltip,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleMode, toggleSidebar } from "../store/uiSlice";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.ui.mode);

  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{
        backdropFilter: "blur(4px)",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            edge="start"
            onClick={() => dispatch(toggleSidebar())}
            aria-label="toggle sidebar"
          >
            <MenuOpenIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Tooltip
              title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            >
              <IconButton onClick={() => dispatch(toggleMode())}>
                {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </Tooltip>
          </Box>
          {/* <Box display="flex" alignItems="center" gap={1}>
            <Avatar alt="Dummy User" sx={{ width: 36, height: 36 }}>
              V
            </Avatar>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, fontWeight: 600 }}
            >
              Vishnupriyan
            </Typography>
          </Box> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
