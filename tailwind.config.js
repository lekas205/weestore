/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: '#9A9A9D',
        light: '#F4F4F8',
        success: '#009930',
        primary: '#FA4A0C',
        green: '#32D74B',
        error: '#D73232',
      },
    },
  },
  plugins: [],
}
