import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "../../hooks";
import { setCredentials } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;

      if (i === text.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayed}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        |
      </motion.span>
    </motion.div>
  );
};

const slogans = [
  "Manage employees effortlessly",
  "Track attendance with ease",
  "Streamline payroll and leaves",
  "Empower your workforce smarter",
];

const Login = () => {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [index, setIndex] = useState(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Rotate slogans
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {
    const mockUsers = [
      {
        name: "admin",
        password: "admin123",
        role: "ADMIN",
        token: "mock-admin-token",
      },
      {
        name: "user",
        password: "user123",
        role: "EMPLOYEE",
        token: "mock-user-token",
      },
    ];

    const foundUser = mockUsers.find(
      (u) => u.name === name && u.password === password
    );

    if (!foundUser) {
      alert("Invalid credentials");
      return;
    }

    dispatch(
      setCredentials({
        token: foundUser.token,
        user: {
          name: foundUser.name,
          role: foundUser.role,
        },
      })
    );

    navigate(foundUser.role === "ADMIN" ? "/dashboard" : "/article");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: "url(/assets/login-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
      }}
    >
      {/* LEFT BRANDING */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={8}
        color="white"
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: `linear-gradient(135deg, 
      ${theme.palette.primary.main}, 
      ${theme.palette.mode === "dark" ? "#ffffff" : "#0f1724"}
    )`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          Worqent
        </Typography>
        <Typography variant="h5" fontWeight={400} sx={{ minHeight: 36, ml: 0 }}>
          <TypewriterText text={slogans[index]} />
        </Typography>

        <Box
          sx={{
            maxWidth: 560,
            mb: 3,
            p: 3,
            borderRadius: 2,
            background: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              lineHeight: 1.7,
            }}
          >
            Worqent is a modern employee management platform designed to
            simplify workforce operations. From attendance and leave management
            to payroll tracking and performance insights, Worqent helps
            organizations stay organized, efficient, and employee-focused.
          </Typography>
        </Box>
      </Box>

      {/* RIGHT LOGIN CARD */}
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Paper
          elevation={0}
          sx={{
            width: 380,
            p: 4,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <Typography variant="h5" mb={2} fontWeight={600} color="white">
            Login
          </Typography>

          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{
              sx: {
                color: "#fff",
                "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{
              sx: {
                color: "#fff",
                "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.2,
              borderRadius: 2,
              background: "linear-gradient(135deg, #6C63FF, #3F3D56)",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
