/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // blue-500
    
        },
        secondary: {
          DEFAULT: '#6b7280', // gray-500
        },
        accent: {
          DEFAULT: '#f97316', // orange-500
        },
      },
    },
  },
  plugins: [],
}