import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Upload } from 'lucide-react';
import { theme } from '../../../styles/theme';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  previewSrc?: string;
  placeholder?: string;
}

const StyledUploadArea = styled(Box)(({ theme: muiTheme }) => ({
  border: `2px dashed ${theme.colors.border.default}`,
  borderRadius: theme.borderRadius.md,
  padding: theme.spacing.xl,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: theme.colors.background.default,
  
  '&:hover': {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}0a`,
  },
  
  '&:focus-within': {
    borderColor: theme.colors.primary,
    boxShadow: theme.shadows.focus,
  },
}));

const StyledHiddenInput = styled('input')({
  position: 'absolute',
  opacity: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
});

const PreviewImage = styled('img')({
  maxWidth: '100px',
  maxHeight: '100px',
  borderRadius: theme.borderRadius.sm,
  marginBottom: theme.spacing.md,
});

const UploadArea: React.FC<UploadAreaProps> = ({
  onFileSelect,
  accept = "image/*",
  previewSrc,
  placeholder = "Click to upload or drag and drop",
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <StyledUploadArea position="relative">
      <StyledHiddenInput
        type="file"
        accept={accept}
        onChange={handleFileChange}
      />
      
      {previewSrc ? (
        <Box>
          <PreviewImage src={previewSrc} alt="Preview" />
          <Typography variant="caption" color="text.secondary" display="block">
            Click to change
          </Typography>
        </Box>
      ) : (
        <Box>
          <Upload 
            size={32} 
            color={theme.colors.primary}
            style={{ marginBottom: theme.spacing.sm }}
          />
          <Typography 
            variant="body2" 
            color="text.primary"
            sx={{ fontWeight: 500, mb: 0.5 }}
          >
            {placeholder}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            PNG, JPG up to 5MB
          </Typography>
        </Box>
      )}
    </StyledUploadArea>
  );
};

export default UploadArea;