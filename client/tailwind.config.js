/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chancellor: {
          gold: '#D4AF37',
          red: '#8B0000',
          dark: '#1A1A1A',
        }
      }
    },
  },
  plugins: [],
}
