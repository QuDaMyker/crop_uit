/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      fontSize: {
        h1: '2.6rem',
      },
      height: {
        header: '560px',
        rate: '400px',
      },
      colors: {
        main: '#333333',
        subMain: '#da966e',
        dry: '#000',
        star: '#FFB000',
        text: '#C0C0C0',
        border: '#4b5563',
        dryGray: '#E0D5D5',
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}

