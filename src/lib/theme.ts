/**
 * Design System Theme Configuration
 * Modern SaaS Dark Theme inspired by Weavy.ai
 */

export const theme = {
  colors: {
    // Background colors
    background: {
      primary: '#020617',      // slate-950
      secondary: '#0f172a',    // slate-900
      tertiary: '#1e293b',     // slate-800
    },
    
    // Border colors
    border: {
      default: '#334155',      // slate-700
      light: '#475569',        // slate-600
      subtle: 'rgba(255, 255, 255, 0.1)',
    },
    
    // Node type colors
    nodes: {
      text: {
        primary: '#3b82f6',    // blue-500
        gradient: 'from-blue-500 to-blue-600',
      },
      uploadImage: {
        primary: '#10b981',    // green-500
        gradient: 'from-green-500 to-green-600',
      },
      uploadVideo: {
        primary: '#f59e0b',    // amber-500
        gradient: 'from-amber-500 to-amber-600',
      },
      llm: {
        primary: '#a855f7',    // purple-500
        gradient: 'from-purple-500 to-purple-600',
      },
      cropImage: {
        primary: '#ec4899',    // pink-500
        gradient: 'from-pink-500 to-pink-600',
      },
      extractFrame: {
        primary: '#06b6d4',    // cyan-500
        gradient: 'from-cyan-500 to-cyan-600',
      },
    },
    
    // Status colors
    status: {
      running: {
        bg: 'bg-amber-500/20',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        ring: 'ring-amber-500/50',
      },
      completed: {
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        border: 'border-green-500/30',
        ring: 'ring-green-500/50',
      },
      failed: {
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        border: 'border-red-500/30',
        ring: 'ring-red-500/50',
      },
      pending: {
        bg: 'bg-slate-500/20',
        text: 'text-slate-400',
        border: 'border-slate-500/30',
        ring: 'ring-slate-500/50',
      },
    },
    
    // Accent colors
    accent: {
      primary: '#7c3aed',      // violet-600
      secondary: '#3b82f6',    // blue-500
    },
  },
  
  // Glassmorphism styles
  glass: {
    light: 'bg-white/5 backdrop-blur-md border border-white/10',
    medium: 'bg-white/10 backdrop-blur-lg border border-white/20',
    dark: 'bg-slate-900/80 backdrop-blur-xl border border-slate-700',
  },
  
  // Shadow styles
  shadows: {
    sm: 'shadow-sm shadow-black/20',
    md: 'shadow-md shadow-black/30',
    lg: 'shadow-lg shadow-black/40',
    xl: 'shadow-xl shadow-black/50',
    glow: {
      purple: 'shadow-lg shadow-purple-500/50',
      blue: 'shadow-lg shadow-blue-500/50',
      green: 'shadow-lg shadow-green-500/50',
      pink: 'shadow-lg shadow-pink-500/50',
    },
  },
  
  // Animation presets
  animations: {
    hover: 'transition-all duration-200 ease-in-out hover:scale-105',
    hoverGlow: 'transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-purple-500/50',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    slideIn: 'transition-all duration-300 ease-out',
  },
  
  // Spacing
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
  },
  
  // Border radius
  radius: {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  },
} as const;

export type Theme = typeof theme;
