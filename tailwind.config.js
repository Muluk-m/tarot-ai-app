/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './src/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#0A0E1A',
        'bg-secondary': '#151B2E',
        'bg-tertiary': '#1E2638',
        'bg-overlay': 'rgba(10, 14, 26, 0.95)',

        // Accent colors
        'accent-gold': '#D4AF37',
        'accent-gold-light': '#F4D03F',
        'accent-gold-dark': '#B8962E',
        'accent-purple': '#8B5CF6',
        'accent-purple-light': '#A78BFA',
        'accent-cyan': '#22D3EE',
        'accent-cyan-light': '#67E8F9',

        // Text colors
        'text-primary': '#F8FAFC',
        'text-secondary': '#CBD5E1',
        'text-tertiary': '#94A3B8',
        'text-gold': '#D4AF37',

        // Semantic colors
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.5)',
        'purple-glow': '0 0 30px rgba(139, 92, 246, 0.6)',
        card: '0 8px 32px rgba(0, 0, 0, 0.8)',
      },
      // Font family commented out until fonts are loaded
      // fontFamily: {
      //   heading: ['Cinzel-Bold'],
      //   body: ['Inter-Regular'],
      //   medium: ['Inter-Medium'],
      //   semibold: ['Inter-SemiBold'],
      // },
    },
  },
  plugins: [],
};
