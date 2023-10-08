/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      gun: '#1B2F33',
      white: '#EEF1EF',
      ored: '#fE5F55',
      oblue: '#4392f1',
      ogreen: '#87a330',
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      slate: colors.slate,
      oyell: '#FFB627'
    }
    
  },
  plugins: [],
}

