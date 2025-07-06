/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'thai': ['Sarabun', 'sans-serif'],
      },
      colors: {
        'thai-red': '#B91C1C',
        'thai-green': '#059669',
        'thai-blue': '#1E40AF',
        'thai-gold': '#F59E0B',
      }
    },
  },
  plugins: [],
}
