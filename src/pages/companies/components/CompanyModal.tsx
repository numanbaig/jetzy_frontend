import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Building2 } from "lucide-react";
import { Modal, Button, Input, FormField, UploadArea } from "../../../components/ui";
import { theme } from "../../../styles/theme";
import { 
  useCreateCompanyMutation, 
  useUpdateCompanyMutation 
} from "../../../store/appApi";
import type { Company } from "../../../store/services/companyService";

interface CompanyModalProps {
  open: boolean;
  onClose: () => void;
  company?: Company | null;
  mode: 'add' | 'edit';
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

const CompanyModal: React.FC<CompanyModalProps> = ({ 
  open, 
  onClose, 
  company, 
  mode 
}) => {
  const [createCompany, { isLoading: isCreating }] = useCreateCompanyMutation();
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();
  const [logoPreview, setLogoPreview] = useState<string>("");

  const isLoading = isCreating || isUpdating;
  const isEdit = mode === 'edit';

  const initialValues = {
    name: company?.name || "",
    email: company?.email || "",
    website: company?.website || "",
    logo: company?.logo || "",
  };

  useEffect(() => {
    if (isEdit && company?.logo) {
      setLogoPreview(company.logo);
    } else if (!isEdit) {
      setLogoPreview("");
    }
  }, [company, isEdit, open]);

  const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
    try {
      if (isEdit && company?._id) {
        await updateCompany({
          _id: company._id,
          ...values,
        }).unwrap();
      } else {
        await createCompany(values).unwrap();
      }
      resetForm();
      setLogoPreview("");
      onClose();
    } catch (err) {
      console.error(`Failed to ${isEdit ? 'update' : 'create'} company:`, err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileSelect = (file: File, setFieldValue: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setLogoPreview(result);
      setFieldValue("logo", result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Company" : "Add New Company"}
      icon={<Building2 size={24} />}
      maxWidth="md"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: theme.spacing.lg }}>
              {/* Company Name */}
              <FormField label="Company Name" required>
                <Field
                  as={Input}
                  name="name"
                  placeholder="Enter company name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  backgroundColor={theme.colors.background.paper}
                />
              </FormField>

              {/* Email */}
              <FormField label="Email Address">
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  backgroundColor={theme.colors.background.paper}
                />
              </FormField>

              {/* Website */}
              <FormField label="Website URL">
                <Field
                  as={Input}
                  name="website"
                  type="url"
                  placeholder="https://example.com"
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.website && Boolean(errors.website)}
                  helperText={touched.website && errors.website}
                  backgroundColor={theme.colors.background.paper}
                />
              </FormField>

              {/* Logo Upload */}
              <FormField label="Company Logo">
                <UploadArea
                  onFileSelect={(file) => handleFileSelect(file, setFieldValue)}
                  previewSrc={logoPreview || undefined}
                  placeholder="Click to upload company logo"
                />
              </FormField>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isLoading}
                  gradient
                >
                  {isEdit ? "Update Company" : "Create Company"}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CompanyModal;