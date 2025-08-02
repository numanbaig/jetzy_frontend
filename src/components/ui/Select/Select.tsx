import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select as MuiSelect, 
  SelectProps as MuiSelectProps,
  FormHelperText,
  MenuItem
} from '@mui/material';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends Omit<MuiSelectProps, 'children'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ 
  label,
  helperText,
  error,
  options,
  placeholder,
  sx,
  ...props 
}) => {
  const selectStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1,
      "&:hover fieldset": {
        borderColor: "#3c8dbc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3c8dbc",
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "#3c8dbc",
      },
    },
    ...sx,
  };

  return (
    <FormControl fullWidth error={error} sx={selectStyles}>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect
        label={label}
        displayEmpty={!!placeholder}
        {...props}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;