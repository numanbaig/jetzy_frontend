import React, { useState } from "react";
import {
  Box, TextField, Button, Typography, InputAdornment,
  IconButton, Alert, CircularProgress, Container, Card, CardContent, Divider,
} from "@mui/material";
import {
  Visibility, VisibilityOff, Email, Lock, Business, Login as LoginIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUserLoginMutation } from "@/store/appApi";
import { useNavigate } from "react-router-dom";

export default function Login(): React.JSX.Element {

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [loginUser, { isLoading, isError, error }] = useUserLoginMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await loginUser({
          email: values.email,
          password: values.password,
          role: "admin",
        }).unwrap();
        navigate("/dashboard/overview");
  
      } catch (err) {
        console.error("Login failed:", err);
      }
    },
  });
  

  return (
    <Box sx={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      p: 2,
    }}>
      <Container maxWidth="sm">
        <Card elevation={24} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Box sx={{
            background: "linear-gradient(135deg, #3c8dbc 0%, #2c3e50 100%)",
            color: "white", p: 4, textAlign: "center"
          }}>
            <Business sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" fontWeight="bold">Jetzy CRM</Typography>
            <Typography>Mini-CRM Management System</Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" textAlign="center" mb={3}>Sign In</Typography>

            {isError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {(error as any)?.data?.message || "Login failed. Please try again."}
              </Alert>
            )}

            <form onSubmit={formik.handleSubmit} noValidate>
              <Box display="flex" flexDirection="column" gap={3}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    background: "linear-gradient(135deg, #3c8dbc 0%, #2c3e50 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2c3e50 0%, #3c8dbc 100%)",
                    },
                  }}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </Box>
            </form>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">Demo Credentials</Typography>
            </Divider>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">Email: admin@admin.com</Typography>
              <Typography variant="body2" color="text.secondary">Password: password</Typography>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
            © 2025 Jetzy CRM. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
