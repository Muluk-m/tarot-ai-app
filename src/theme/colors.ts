/**
 * Mystical Dark Theme Color Palette
 * Designed for AI Tarot Reading App
 */

export const colors = {
  // Base backgrounds
  background: {
    primary: '#0A0E1A', // Deep navy, almost black
    secondary: '#151B2E', // Slightly lighter panels
    tertiary: '#1E2638', // Card backgrounds
    overlay: 'rgba(10, 14, 26, 0.95)', // Modal overlay
  },

  // Accent colors
  accent: {
    gold: '#D4AF37', // Primary gold accent
    goldLight: '#F4D03F', // Lighter gold for highlights
    goldDark: '#B8962E', // Darker gold for shadows
    purple: '#8B5CF6', // Mystical purple
    purpleLight: '#A78BFA', // Light purple for glows
    cyan: '#22D3EE', // Celestial cyan
    cyanLight: '#67E8F9', // Light cyan for stars
  },

  // Text
  text: {
    primary: '#F8FAFC', // Almost white for headings
    secondary: '#CBD5E1', // Light gray for body
    tertiary: '#94A3B8', // Muted gray for labels
    gold: '#D4AF37', // Gold text for emphasis
  },

  // Semantic colors
  success: '#10B981', // Green for confirmations
  error: '#EF4444', // Red for errors
  warning: '#F59E0B', // Amber for warnings
  info: '#3B82F6', // Blue for info

  // Card-specific
  card: {
    border: '#D4AF37', // Gold border
    glow: 'rgba(212, 175, 55, 0.3)', // Gold glow effect
    shadow: 'rgba(0, 0, 0, 0.8)', // Deep shadow
  },

  // Interactive
  interactive: {
    buttonPrimary: '#D4AF37',
    buttonHover: '#F4D03F',
    buttonPressed: '#B8962E',
    inputBorder: '#334155',
    inputFocus: '#D4AF37',
  },
} as const;

export const gradients = {
  background: ['#0A0E1A', '#1E2638'] as const,
  card: ['#1E2638', '#151B2E'] as const,
  gold: ['#D4AF37', '#F4D03F'] as const,
  purple: ['#8B5CF6', '#A78BFA'] as const,
  cosmic: ['#0A0E1A', '#1E2638', '#2E1A47'] as const,
} as const;

export type Colors = typeof colors;
export type Gradients = typeof gradients;
