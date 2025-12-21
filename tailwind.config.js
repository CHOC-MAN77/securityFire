/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#c0392b',
        'primary-dark': '#922b21',
        secondary: '#2c3e50',
        accent: '#e74c3c',
      },
    },
  },
  plugins: [],
};