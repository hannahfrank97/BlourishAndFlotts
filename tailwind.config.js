/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-blue1': '#25aae1',
        'color-blue2': '#4481eb',
        'color-blue3': '#04befe',
        'color-blue4': '#3f86ed',

      }

    },
  },
  plugins: [],
}

