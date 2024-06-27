/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange_100: "#BA8039",
        orange_200: "#a47230",
        orange_300: "#D3AD7F",
        gray_100: "#bdbdbd",
        gray_200: "#383838",
        gray_300: "#909090",
        gray_400: "#191919",
        gray_500: "#3A383D",
        gray_600: "#9B9B9B",
        gray_700: "#2D2D2D",
        gray_800: "#838382",
        blue_100: "#77A9B0",
      },
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "coffee-lg": "url('./src/assets/coffee-lg-bg.jpg')",
        "coffee-sm": "url('./src/assets/coffee-sm-bg.jpg')",
        "coffee-parts": "url('./src/assets/coffee-parts-bg.png')",
      },
    },
  },
  plugins: [],
};
