import React from "react";
import { Box, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Users } from "lucide-react";
import { Modal, Button, Input, Select, FormField } from "../../../components/ui";
import { theme } from "../../../styles/theme";
import { 
  useCreateEmployeeMutation, 
  useUpdateEmployeeMutation,
  useGetAllCompaniesQuery 
} from "../../../store/appApi";
import type { Employee } from "../../../store/services/employeeService";

interface EmployeeModalProps {
  open: boolean;
  onClose: () => void;
  employee?: Employee | null;
  mode: 'add' | 'edit';
}

const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  last_name: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  company_id: Yup.string()
    .required("Company is required"),
  email: Yup.string()
    .email("Invalid email format")
    .optional(),
  phone: Yup.string()
    .optional(),
});

const EmployeeModal: React.FC<EmployeeModalProps> = ({ 
  open, 
  onClose, 
  employee, 
  mode 
}) => {
  const [createEmployee, { isLoading: isCreating }] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
  const { data: companies, isLoading: isLoadingCompanies } = useGetAllCompaniesQuery({});

  const isLoading = isCreating || isUpdating;
  const isEdit = mode === 'edit';

  // Handle both string company_id and populated company object
  const getCompanyId = (employee: Employee | null) => {
    if (!employee) return "";
    
    // If company_id is a string, use it directly
    if (typeof employee.company_id === 'string') {
      return employee.company_id;
    }
    
    // If company_id is an object (populated), extract the _id
    if (employee.company_id && typeof employee.company_id === 'object') {
      return (employee.company_id as any)._id || "";
    }
    
    // If there's a separate company object, use its _id
    if (employee.company?._id) {
      return employee.company._id;
    }
    
    return "";
  };

  const initialValues = {
    first_name: employee?.first_name || "",
    last_name: employee?.last_name || "",
    company_id: getCompanyId(employee || null),
    email: employee?.email || "",
    phone: employee?.phone || "",
  };



  const companyOptions = (companies as any)?.data?.map((company: any) => ({
    value: company._id,
    label: company.name,
  })) || [];

  const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
    try {
      if (isEdit && employee?._id) {
        await updateEmployee({
          _id: employee._id,
          ...values,
        }).unwrap();
      } else {
        await createEmployee(values).unwrap();
      }
      resetForm();
      onClose();
    } catch (err) {
      console.error(`Failed to ${isEdit ? 'update' : 'create'} employee:`, err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Employee" : "Add New Employee"}
      icon={<Users size={24} />}
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
              {/* Name Fields Row */}
              <Box sx={{ display: "flex", gap: theme.spacing.md }}>
                <Box sx={{ flex: 1 }}>
                  <FormField label="First Name" required>
                    <Field
                      as={Input}
                      name="first_name"
                      placeholder="Enter first name"
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.first_name && Boolean(errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                      backgroundColor={theme.colors.background.paper}
                    />
                  </FormField>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <FormField label="Last Name" required>
                    <Field
                      as={Input}
                      name="last_name"
                      placeholder="Enter last name"
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.last_name && Boolean(errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                      backgroundColor={theme.colors.background.paper}
                    />
                  </FormField>
                </Box>
              </Box>

              {/* Company Selection */}
              <FormField label="Company" required>
                <Field name="company_id">
                  {({ field, meta }: any) => {
                    // Ensure the value is always a string
                    const safeValue = typeof field.value === 'string' ? field.value : String(field.value || "");
                    
                    return (
                      <Select
                        options={companyOptions}
                        placeholder={isLoadingCompanies ? "Loading companies..." : "Select a company"}
                        value={safeValue}
                        onChange={(e) => setFieldValue("company_id", e.target.value)}
                        onBlur={field.onBlur}
                        disabled={isLoadingCompanies}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    );
                  }}
                </Field>
              </FormField>

              {/* Contact Information Row */}
              <Box sx={{ display: "flex", gap: theme.spacing.md }}>
                <Box sx={{ flex: 1 }}>
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
                </Box>
                <Box sx={{ flex: 1 }}>
                  <FormField label="Phone Number">
                    <Field
                      as={Input}
                      name="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                      backgroundColor={theme.colors.background.paper}
                    />
                  </FormField>
                </Box>
              </Box>

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
                  {isEdit ? "Update Employee" : "Create Employee"}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EmployeeModal;