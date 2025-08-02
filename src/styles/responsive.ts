import { theme } from './theme';

export const responsive = {
  // Breakpoint helpers
  up: (breakpoint: keyof typeof theme.breakpoints) => `@media (min-width: ${theme.breakpoints[breakpoint]})`,
  down: (breakpoint: keyof typeof theme.breakpoints) => {
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const currentIndex = breakpoints.indexOf(breakpoint);
    const prevBreakpoint = breakpoints[currentIndex - 1];
    if (!prevBreakpoint) return '@media (max-width: 0px)';
    return `@media (max-width: calc(${theme.breakpoints[breakpoint]} - 1px))`;
  },
  
  // Common responsive patterns
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: {
      xs: theme.spacing.md,
      sm: theme.spacing.lg,
      md: theme.spacing.xl,
    },
  },
  
  grid: {
    display: 'grid',
    gap: theme.spacing.lg,
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
    },
  },
  
  flexColumn: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: theme.spacing.lg,
  },
  
  hideOnMobile: {
    display: { xs: 'none', md: 'block' },
  },
  
  showOnMobile: {
    display: { xs: 'block', md: 'none' },
  },
  
  text: {
    responsive: {
      fontSize: {
        xs: '0.875rem',
        sm: '1rem',
        md: '1.125rem',
      },
    },
    heading: {
      fontSize: {
        xs: '1.5rem',
        sm: '2rem',
        md: '2.5rem',
      },
      fontWeight: 600,
    },
  },
} as const;

export type Responsive = typeof responsive;