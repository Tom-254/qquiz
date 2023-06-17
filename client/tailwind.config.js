/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primarytext: {
          "primary": "var(--primary-color-800)",
          1000: "var(--primary-text-black)",
          900: "var(--primary-text-900)",
        },
        secondarytext: {600: "var(--secondary-text-600)", 500: "var(--secondary-text-500)"},
        primary: "var(--primary-color-800)",
        primarydark: "var(--primary-color-900)",
        primarylight: "var(--primary-color-500)",
        primaryaccent: "var(--primay-accent-100)",
        primarygreen: "var(--primary-green-500)",
        primaryred: "var(--primary-red-500)",
        white: "var(--background-white)",
        background: "var(--background-color)",
        border: "var(--border-color)",
        borderlight: "var(--border-color-light)",
        borderdark: "var(--border-dark-color)",
        borderdarker: "var(----primary-text-black)"
      },
      fontFamily: {
        primary: "Nunito Sans",
      },
    },
  },
  plugins: [],
}