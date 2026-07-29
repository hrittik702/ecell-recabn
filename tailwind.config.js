/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#F9FAFB',
        'charcoal': '#111827',
        'indigo-accent': '#4338CA',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
