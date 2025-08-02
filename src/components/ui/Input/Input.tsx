import React from 'react';
import { TextField, type TextFieldProps, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  backgroundColor?: string;
}

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'backgroundColor',
})<{ backgroundColor?: string }>(({ theme, backgroundColor }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: backgroundColor || 'transparent',
    borderRadius: theme.spacing(1),
    transition: 'all 0.2s ease-in-out',
    
    '& fieldset': {
      borderColor: theme.palette.grey[300],
    },
    
    '&:hover fieldset': {
      borderColor: '#3c8dbc',
    },
    
    '&.Mui-focused fieldset': {
      borderColor: '#3c8dbc',
      borderWidth: 2,
    },
    
    '&.Mui-focused': {
      backgroundColor: backgroundColor || 'transparent',
    },
  },
  
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    
    '&.Mui-focused': {
      color: '#3c8dbc',
    },
  },
  
  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    marginTop: theme.spacing(0.5),
  },
}));

const Input: React.FC<InputProps> = ({ 
  variant = 'outlined',
  startIcon,
  endIcon,
  backgroundColor,
  InputProps,
  ...props 
}) => {
  const inputProps = {
    ...InputProps,
    ...(startIcon && {
      startAdornment: (
        <InputAdornment position="start">
          {startIcon}
        </InputAdornment>
      ),
    }),
    ...(endIcon && {
      endAdornment: (
        <InputAdornment position="end">
          {endIcon}
        </InputAdornment>
      ),
    }),
  };

  return (
    <StyledTextField
      variant={variant}
      backgroundColor={backgroundColor}
      InputProps={inputProps}
      fullWidth
      {...props}
    />
  );
};

export default Input;