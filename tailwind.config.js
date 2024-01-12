/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: "#000000",
      white: "#ffffff",
      blue: "#5393E8",
      blue2: "#E5F9FB",
      cardb1: "#99C3F9",
      cardb2: "#5393E8",
      cardb3: "#2366BC",
      cardb4: "#134C97",
      grey: "#ECE5E5",
      bggrey: "#F3F4F7",
      red: "#FF6347",
    },
    extend: {},
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
};
