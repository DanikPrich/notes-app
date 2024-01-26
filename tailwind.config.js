/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-+/,
      variants: ['lg', 'hover', 'focus', 'bg:hover'],
    },
  ],
  theme: {
    extend: {
      width: {
      '240': '240px',
      }
    },
  },
  plugins: [],
}

