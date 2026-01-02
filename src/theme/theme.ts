// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#1976d2" },
            background: { default: "#f5f7fb", paper: "#ffffff" },
            text: { primary: "#0f1724" },
          }
        : {
            primary: { main: "#90caf9" },
            background: { default: "#0b1220", paper: "#071122" },
            text: { primary: "#e6eef8" },
          }),
    },
    
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: "2rem", fontWeight: 700 },
      h2: { fontSize: "1.5rem", fontWeight: 600 },
      body1: { fontSize: "0.95rem" },
    },
    components: {
      MuiAppBar: {
        defaultProps: { elevation: 0 },
      },
    },
  });
