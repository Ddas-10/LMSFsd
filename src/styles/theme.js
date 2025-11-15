// Centralized theme configuration with CSS custom properties for dynamic theming
// "Warm Minimal Beige" (Light) + "Velvet Night" (Dark)

export const theme = {
  colors: {
    // Light mode colors - "Warm Minimal Beige" (Aesthetic & Professional)
    light: {
      primary: '#F5F3EF',        // Soft Linen - Page background
      card: '#FFFFFF',            // Pure Porcelain - Card backgrounds
      accent: {
        primary: '#6B5B95',       // Royal Mauve - Primary actions, buttons, highlights
        secondary: '#9A8C98',     // Dusty Lavender - Secondary accents, gradients
        hover: '#7E6CC6',         // Twilight Violet - Hover states
      },
      text: {
        primary: '#2C2C2C',       // Deep Charcoal - Headings, main text
        secondary: '#6B6B6B',     // Warm Ash - Descriptions, subtitles
      },
      border: '#E5E0DA',          // Neutral Sand - Borders, dividers
      section: '#EFEAE5',         // Gentle Ivory - Section backgrounds
    },
    
    // Dark mode colors - "Velvet Night" (Modern, Deep, Premium)
    dark: {
      primary: '#1C1B22',         // Nocturne Black - Page background
      card: '#23222A',            // Obsidian Slate - Card backgrounds
      accent: {
        primary: '#8B7FD0',       // Velvet Indigo - Primary actions, buttons, highlights
        secondary: '#A499D9',     // Soft Amethyst - Secondary accents, gradients
        hover: '#B3A8F2',         // Lavender Glow - Hover states
      },
      text: {
        primary: '#E8E6EB',       // Pearl Mist - Headings, main text
        secondary: '#A1A0A8',     // Silver Fog - Descriptions, subtitles
      },
      border: '#2E2D36',          // Shadow Line - Borders, dividers
      section: '#1A1A21',         // Midnight Veil - Section backgrounds
    },
    
    // Status colors (same for both modes) - Only used for performance metrics
    success: {
      light: '#10b981',
      DEFAULT: '#059669',
      dark: '#047857',
    },
    warning: {
      light: '#f59e0b',
      DEFAULT: '#d97706',
      dark: '#b45309',
    },
    error: {
      light: '#ef4444',
      DEFAULT: '#dc2626',
      dark: '#b91c1c',
    },
    
    // Legacy neutral colors for backward compatibility (use sparingly)
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    }
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    accent: '0 4px 12px rgba(107, 91, 149, 0.3)',      // Light mode accent shadow
    accentDark: '0 4px 12px rgba(139, 127, 208, 0.3)', // Dark mode accent shadow
  },
  
  gradients: {
    // Primary gradient (most used)
    primary: 'linear-gradient(135deg, #6B5B95, #9A8C98)',           // Light mode
    primaryDark: 'linear-gradient(135deg, #8B7FD0, #A499D9)',       // Dark mode
    
    // Reverse gradient for variety
    secondary: 'linear-gradient(135deg, #9A8C98, #6B5B95)',         // Light mode
    secondaryDark: 'linear-gradient(135deg, #A499D9, #8B7FD0)',     // Dark mode
    
    // Animated gradient for progress bars
    progress: 'linear-gradient(90deg, #6B5B95, #9A8C98)',           // Light mode
    progressDark: 'linear-gradient(90deg, #8B7FD0, #A499D9)',       // Dark mode
  },
  
  // Typography scale
  typography: {
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      heading: ['Poppins', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    }
  },
  
  // Spacing scale
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  
  // Border radius
  borderRadius: {
    sm: '0.375rem',   // 6px
    DEFAULT: '0.5rem', // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    full: '9999px',
  },
  
  // Animation durations
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
};

// Helper function to apply theme to CSS custom properties
export const applyTheme = (isDark = false) => {
  const mode = isDark ? 'dark' : 'light';
  const colors = theme.colors[mode];
  
  const root = document.documentElement;
  
  root.style.setProperty('--bg-primary', colors.primary);
  root.style.setProperty('--bg-card', colors.card);
  root.style.setProperty('--accent-primary', colors.accent.primary);
  root.style.setProperty('--accent-secondary', colors.accent.secondary);
  root.style.setProperty('--accent-hover', colors.accent.hover);
  root.style.setProperty('--text-primary', colors.text.primary);
  root.style.setProperty('--text-secondary', colors.text.secondary);
  root.style.setProperty('--border-color', colors.border);
  root.style.setProperty('--section-bg', colors.section);
  
  // Toggle dark class on document
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Helper to get current theme colors
export const getCurrentTheme = (isDark = false) => {
  return isDark ? theme.colors.dark : theme.colors.light;
};

// Export default
export default theme;