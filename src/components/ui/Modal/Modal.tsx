import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  icon,
  children,
  actions,
  maxWidth = 'md',
  fullWidth = true,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          minHeight: '500px',
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
          py: 2.5,
          minHeight: '70px',
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {icon && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}>
              {icon}
            </Box>
          )}
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{ 
            color: "white", 
            "&:hover": { 
              backgroundColor: "rgba(255,255,255,0.1)",
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <X size={24} />
        </IconButton>
      </DialogTitle>

      <DialogContent 
        sx={{ 
          p: 4,
          backgroundColor: '#fafbfc',
          minHeight: '400px',
        }}
      >
        <Box sx={{ 
          backgroundColor: 'white',
          borderRadius: 2,
          p: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          {children}
        </Box>
      </DialogContent>

      {actions && (
        <DialogActions 
          sx={{ 
            p: 4, 
            pt: 0,
            backgroundColor: '#fafbfc',
            gap: 2,
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;