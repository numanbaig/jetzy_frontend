import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X, Building2, Upload } from "lucide-react";
import { useCreateCompanyMutation } from "../store/appApi";

interface AddCompanyModalProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .optional(),
  website: Yup.string()
    .url("Invalid website URL")
    .optional(),
  logo: Yup.string()
    .optional(),
});

const initialValues = {
  name: "",
  email: "",
  website: "",
  logo: "",
};

export default function AddCompanyModal({ open, onClose }: AddCompanyModalProps): React.JSX.Element {
  const [createCompany, { isLoading, error }] = useCreateCompanyMutation();
  const [logoPreview, setLogoPreview] = useState<string>("");

  const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
    try {
      console.log(values);
      await createCompany(values).unwrap();
      resetForm();
      setLogoPreview("");
      onClose();
    } catch (err) {
      console.error("Failed to create company:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFieldValue("logo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #3c8dbc 0%, #2c3e50 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Building2 size={24} />
          <Typography variant="h6">Add New Company</Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{ color: "white", "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
        >
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1,mt:2, color: "#2c3e50", fontWeight: 600 }}>
                    Company Name *
                  </Typography>
                  <Field
                    as={TextField}
                    name="name"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter company name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        "&:hover fieldset": {
                          borderColor: "#3c8dbc",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3c8dbc",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Email */}
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: "#2c3e50", fontWeight: 600 }}>
                    Email Address
                  </Typography>
                  <Field
                    as={TextField}
                    name="email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter company email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        "&:hover fieldset": {
                          borderColor: "#3c8dbc",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3c8dbc",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Website */}
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: "#2c3e50", fontWeight: 600 }}>
                    Website
                  </Typography>
                  <Field
                    as={TextField}
                    name="website"
                    fullWidth
                    variant="outlined"
                    placeholder="https://example.com"
                    value={values.website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.website && Boolean(errors.website)}
                    helperText={touched.website && errors.website}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        "&:hover fieldset": {
                          borderColor: "#3c8dbc",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3c8dbc",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Logo Upload */}
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: "#2c3e50", fontWeight: 600 }}>
                    Company Logo
                  </Typography>
                  <Box
                    sx={{
                      border: "2px dashed #d1d5db",
                      borderRadius: 1,
                      p: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor: "#3c8dbc",
                        backgroundColor: "#f8f9fa",
                      },
                    }}
                    onClick={() => document.getElementById("logo-upload")?.click()}
                  >
                    {logoPreview ? (
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain" }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          Click to change logo
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                        <Upload size={32} color="#6b7280" />
                        <Typography variant="body2" color="text.secondary">
                          Click to upload logo
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          PNG, JPG up to 2MB
                        </Typography>
                      </Box>
                    )}
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleLogoChange(e, setFieldValue)}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                <Button
                  onClick={onClose}
                  variant="outlined"
                  sx={{
                    borderColor: "#6b7280",
                    color: "#6b7280",
                    "&:hover": {
                      borderColor: "#374151",
                      backgroundColor: "#f9fafb",
                    },
                  }}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    background: "linear-gradient(135deg, #3c8dbc 0%, #2c3e50 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2c3e50 0%, #3c8dbc 100%)",
                    },
                    "&:disabled": {
                      background: "#9ca3af",
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Create Company"
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>

      {/* Remove the <DialogActions> block entirely */}
    </Dialog>
  );
} 