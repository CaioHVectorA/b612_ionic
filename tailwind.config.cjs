/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        bg: "#E8E8E7",
        light: "#9891c0",
        main: "#6d5fde",
        dark: "#48436c",
        secondary: "#ffc34c",
        darkest: "#302c4d"
      },
      fontFamily: {
        main: ['Inria Sans','sans-serif'],
        number: ['Kufam','sans-serif']
      }
    },
  },
  plugins: [],
}