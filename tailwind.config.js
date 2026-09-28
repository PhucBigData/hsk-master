/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chinese: {
          red: '#c23531',
          gold: '#dca342',
          jade: '#2f855a',
          dark: '#1a1818',
          paper: '#faf7f2',
          ink: '#2b2b2b'
        }
      },
      fontFamily: {
        hanzi: ['"Noto Serif SC"', '"KaiTi"', '"STKaiti"', 'serif', 'sans-serif']
      }
    },
  },
  plugins: [],
}
