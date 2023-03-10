/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{jsx,tsx,css,postcss}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F1F1FC',
          100: '#E4E4FF',
          200: '#D4D3FF',
          300: '#B0ADFF',
          400: '#8E8AFF',
          500: '#6763FC',
          600: '#4C47F5',
          700: '#3B37CC',
          800: '#3431AD',
          900: '#2D2A8C',
        },
      },
    },
  },
  plugins: [],
};
