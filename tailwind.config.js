/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Plugin personalizado para adicionar utilitários de stroke
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke-yellow': {
          '-webkit-text-stroke': '1px #facc15', // cor do stroke
          'color': 'transparent',               // esvazia o preenchimento
        },
      });
    },
  ],
}