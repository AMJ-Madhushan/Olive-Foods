/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      },
      colors: {
        'primary': '#4E8C01',
        'primary-dark': '#3d6b01',
        'primary-darker': '#2d5201',
        'light': '#F3FFE5',
        'light-alt': '#F9FFF5',
        'text': '#161A16',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(220, 53, 69, 0.7)' },
          '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 6px rgba(220, 53, 69, 0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(220, 53, 69, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

