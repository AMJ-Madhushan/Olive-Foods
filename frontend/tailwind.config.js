/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'manrope': ['Manrope'],
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
        'fadeIn': 'fadeIn 1s ease-in-out',
        'fadeInDown': 'fadeInDown 0.6s ease-out',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'fadeInScale': 'fadeInScale 0.5s ease-out',
        'slideInFromLeft': 'slideInFromLeft 0.6s ease-out',
        'slideInFromRight': 'slideInFromRight 0.6s ease-out',
        'slideDown': 'slideDown 0.3s ease-out',
        'slideUp': 'slideUp 0.6s ease-in-out',
        'slideIn': 'slideIn 0.5s ease-in-out',
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s infinite',
        'pulse-btn': 'pulse-btn 2s infinite',
        'bounce': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(78, 140, 1, 0.7)' },
          '70%': { transform: 'scale(1.1)', boxShadow: '0 0 0 10px rgba(78, 140, 1, 0)' },
        },
        'pulse-btn': {
          '0%, 100%': { boxShadow: '0 4px 15px rgba(78, 140, 1, 0.3)' },
          '50%': { boxShadow: '0 4px 25px rgba(78, 140, 1, 0.5)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotate: {
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

