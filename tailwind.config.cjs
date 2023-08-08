/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        bg: "#E8E8E7",
        light: "#61C8D8",
        main: "#546DF5",
        dark: "#743DDB",
        secondary: "#C159FA"
      },
      fontFamily: {
        main: ['Inria Sans','sans-serif'],
        number: ['Kufam','sans-serif']
      }
    },
  },
  plugins: [],
}