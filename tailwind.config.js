/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./public/**/*.{png,svg,jpg}"],
  theme: {
    extend: {},
    colors: { primary: "#00d170", ...colors },
  },
  plugins: [],
};
