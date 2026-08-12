/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
        'dark-bg': '#0a0a0a',
        'dark-surface': '#141414',
        'dark-card': '#1a1a1a',
        'dark-border': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'premium-hover': '0 12px 40px rgba(0, 0, 0, 0.1)',
        'premium-dark': '0 8px 30px rgba(0, 0, 0, 0.4)',
        'premium-dark-hover': '0 12px 40px rgba(0, 0, 0, 0.6)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.15)',
        'glow-strong': '0 0 30px rgba(99, 102, 241, 0.3)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
