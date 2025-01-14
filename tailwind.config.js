/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        dark: {
          800: 'rgba(17, 24, 39, 0.95)',
          900: 'rgba(17, 24, 39, 1)',
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 1))',
      },
    },
  },
  plugins: [],
};