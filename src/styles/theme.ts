export const theme = {
  colors: {
    primary: '#3c8dbc',
    primaryDark: '#2c3e50',
    secondary: '#6c757d',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
    
    // Background colors
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
      modal: 'rgba(255, 255, 255, 0.95)',
    },
    
    // Text colors
    text: {
      primary: '#2c3e50',
      secondary: '#6c757d',
      light: '#ffffff',
    },
    
    // Border colors
    border: {
      light: '#e9ecef',
      default: '#dee2e6',
      focus: '#3c8dbc',
    },
    
    // Gradients
    gradients: {
      primary: 'linear-gradient(135deg, #3c8dbc 0%, #2c3e50 100%)',
      background: `
        linear-gradient(135deg, #667eea 0%, #764ba2 100%),
        radial-gradient(circle at 20% 50%, #667eea 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, #764ba2 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, #3c8dbc 0%, transparent 50%)
      `,
    },
  },
  
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem',      // 48px
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.15)',
    lg: '0 25px 45px rgba(0, 0, 0, 0.15)',
    focus: '0 0 0 3px rgba(60, 141, 188, 0.1)',
  },
  
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  },
} as const;

export type Theme = typeof theme;