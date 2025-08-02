import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FormFieldProps {
  label?: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  className?: string;
}

const StyledFormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  color: '#2c3e50',
  fontWeight: 600,
  fontSize: '0.875rem',
  
  '& .required': {
    color: theme.palette.error.main,
  },
}));

const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  children,
  error,
  className,
}) => {
  return (
    <StyledFormField className={className}>
      {label && (
        <StyledLabel variant="subtitle2">
          {label}
          {required && <span className="required"> *</span>}
        </StyledLabel>
      )}
      {children}
    </StyledFormField>
  );
};

export default FormField;