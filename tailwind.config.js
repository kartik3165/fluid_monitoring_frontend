import animatePlugin from "tailwindcss-animate"; // 1. Add this import at the top

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    animatePlugin, // 2. Add the plugin here
  ],
}