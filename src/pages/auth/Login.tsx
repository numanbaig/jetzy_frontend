import React, { useState, useEffect } from "react";
import {
  Box, Typography, InputAdornment,
  IconButton, Alert, Container, Card, CardContent,
  Fade, Slide
} from "@mui/material";
import {
  Visibility, VisibilityOff, AdminPanelSettings
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useUserLoginMutation } from "@/store/appApi";
import { useNavigate } from "react-router-dom";
import { Button, Input, FormField } from "../../components/ui";
import { theme } from "../../styles/theme";

export default function Login(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const [loginUser, { isLoading, isError, error }] = useUserLoginMutation();

  useEffect(() => {
    setMounted(true);
  }, []);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
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
  };
  

  return (
    <Box
      sx={{
        background: theme.colors.gradients.background,
        backgroundBlendMode: "multiply, normal, normal, normal",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        p: { xs: 1, sm: 2 },
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <Container 
        maxWidth="sm" 
        sx={{ 
          flex: 1,
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          py: 4,
        }}
      >
        <Slide direction="up" in={mounted} timeout={800}>
          <Card
            elevation={0}
            sx={{
              borderRadius: theme.borderRadius.xl,
              overflow: "hidden",
              background: theme.colors.background.modal,
              backdropFilter: "blur(20px)",
              border: `1px solid ${theme.colors.border.light}`,
              boxShadow: theme.shadows.lg,
              width: "100%",
              maxWidth: { xs: "100%", sm: "500px" },
            }}
          >
            <Box
              sx={{
                background: theme.colors.gradients.primary,
                color: theme.colors.text.light,
                p: 5,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)
                  `,
                }}
              />

              <Fade in={mounted} timeout={1200}>
                <Box sx={{ position: "relative", zIndex: 1 }}>
          
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    Jetzy CRM
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                    Mini-CRM Management System
                  </Typography>

                 
                </Box>
              </Fade>
            </Box>

            {/* Form Section */}
            <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              <Fade in={mounted} timeout={1000} style={{ transitionDelay: "300ms" }}>
                <Box>
                  {isError && (
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 3, 
                        borderRadius: 2,
                        "& .MuiAlert-icon": {
                          color: "#e74c3c"
                        }
                      }}
                    >
                      {(error as any)?.data?.message || "Login failed. Please try again."}
                    </Alert>
                  )}

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                      <Form noValidate>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: theme.spacing.sm }}>
                          {/* Email Field */}
                          <FormField label="Email Address" required>
                            <Field
                              as={Input}
                              name="email"
                              type="email"
                              placeholder="Enter your email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.email && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                              backgroundColor={theme.colors.background.paper}
                            />
                          </FormField>

                          <FormField label="Password" required>
                            <Field
                              as={Input}
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.password && Boolean(errors.password)}
                              helperText={touched.password && errors.password}
                              backgroundColor={theme.colors.background.paper}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton 
                                      onClick={() => setShowPassword(!showPassword)} 
                                      edge="end"
                                      sx={{
                                        color: theme.colors.primary,
                                        "&:hover": {
                                          backgroundColor: `${theme.colors.primary}1a`,
                                        },
                                      }}
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </FormField>

                          {/* Sign In Button */}
                          <Button
                            type="submit"
                            fullWidth
                            variant="primary"
                            loading={isLoading || isSubmitting}
                            gradient
                            sx={{
                              py: 2,
                              fontSize: "1.1rem",
                              fontWeight: 600,
                              borderRadius: 2,
                              textTransform: "none",
                              mt: 1,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <AdminPanelSettings />
                              {isLoading || isSubmitting ? "Signing In..." : "Sign In to Dashboard"}
                            </Box>
                          </Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Fade>
            </CardContent>
          </Card>
        </Slide>

      </Container>

 
    </Box>
  );
}
