/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
      fontFamily: {
         'title': ['DM Sans'], // Only use DM Sans
      },
    },
  },
  plugins: [],
}

