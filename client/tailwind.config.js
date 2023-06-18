/** @type {import('tailwindcss').Config} */
// --main-shadow: 0px 0px 30px rgba(17, 12, 46, 0.02);
// --white-shadow: 0px 1px 20px rgba(17, 12, 46, 0.05);
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
        tertiaryhover: "#f9fafb",
        border: "var(--border-color)",
        borderlight: "var(--border-color-light)",
        borderdark: "var(--border-dark-color)",
        borderdarker: "var(----primary-text-black)"
      },
      fontFamily: {
        primary: "Nunito Sans",
      },
      boxShadow: {
        "custom-main": "0px 0px 30px rgba(17, 12, 46, 0.02)",
        "custom-white": "0px 1px 20px rgba(17, 12, 46, 0.05)",
      }
    },
  },
  plugins: [],
}