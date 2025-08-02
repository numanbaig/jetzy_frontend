import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  loading?: boolean;
  gradient?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  loading = false, 
  gradient = false,
  children, 
  disabled,
  sx,
  ...props 
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: 1,
      textTransform: 'none',
      fontWeight: 500,
      padding: '8px 16px',
      ...sx,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: gradient 
            ? "linear-gradient(135deg, #3c8dbc 0%, #2c3e50 100%)"
            : "#3c8dbc",
          "&:hover": {
            background: gradient
              ? "linear-gradient(135deg, #2c3e50 0%, #3c8dbc 100%)"
              : "#2980b9",
          },
          "&:disabled": {
            background: "#9ca3af",
          },
        };
      case 'secondary':
        return {
          ...baseStyles,
          background: gradient
            ? "linear-gradient(135deg, #00a65a 0%, #2c3e50 100%)"
            : "#00a65a",
          "&:hover": {
            background: gradient
              ? "linear-gradient(135deg, #2c3e50 0%, #00a65a 100%)"
              : "#008d4c",
          },
          "&:disabled": {
            background: "#9ca3af",
          },
        };
      case 'outlined':
        return {
          ...baseStyles,
          borderColor: "#6b7280",
          color: "#6b7280",
          "&:hover": {
            borderColor: "#374151",
            backgroundColor: "#f9fafb",
          },
        };
      case 'text':
        return {
          ...baseStyles,
          color: "#6b7280",
          "&:hover": {
            backgroundColor: "#f9fafb",
          },
        };
      default:
        return baseStyles;
    }
  };

  return (
    <MuiButton
      variant={variant === 'outlined' ? 'outlined' : 'contained'}
      disabled={disabled || loading}
      sx={getButtonStyles()}
      {...props}
    >
      {loading ? (
        <CircularProgress size={20} sx={{ color: 'white' }} />
      ) : (
        children
      )}
    </MuiButton>
  );
};

export default Button;