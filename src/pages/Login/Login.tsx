import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useLoginMutation } from "../../api/authApi";
import { useAppDispatch } from "../../hooks";
import { setCredentials } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ name, password }).unwrap();
      dispatch(
        setCredentials({
          token: res.access_token,
          user: res.user,
        })
      );
      navigate("/dashboard");
    } catch (err) {
      console.log("err",err)
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
          disabled={isLoading}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
