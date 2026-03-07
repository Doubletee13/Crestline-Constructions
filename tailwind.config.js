/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/index.html",
    "./*.js"
  ],
  theme: {
    extend: {
      colors: {
        gold: '#fdbe33',
        'gold-dark': '#e0a820',
        navy: '#030c1e',
        'navy-light': '#030f27',
        'navy-mid': '#0b132b',
      },
      fontFamily: {
        heading: ['"Oswald"', 'sans-serif'],
        body: ['"Nunito Sans"', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-down': 'slideDown 0.3s ease forwards',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(3,12,30,0.85) 0%, rgba(3,15,39,0.6) 100%)',
      },
    },
  },
  plugins: [],
}
