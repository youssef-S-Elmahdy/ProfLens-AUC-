/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // AUC Brand Colors
        'auc-blue': {
          900: '#0A1628',
          800: '#0F2744',
          700: '#1A3A5C',
          600: '#254D75',
          500: '#2E6090',
          400: '#4A7DB0',
          300: '#7BA3CC',
          200: '#ADC9E6',
          100: '#DEF0FF',
        },
        'auc-gold': {
          500: '#C9A227',
          400: '#D4B33E',
          300: '#E0C45F',
        },
        'auc-accent': {
          orange: '#E07A2B',
          teal: '#2BB3A0',
          red: '#D94040',
          green: '#3DAA5C',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
