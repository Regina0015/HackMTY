/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'venera-red': '#BE1D20',
        'venera-dark-red': '#8B1518',
        'venera-button': '#BE1D20',
        'venera-gradient-start': '#BE1D20',
        'venera-gradient-end': '#8B1518',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}