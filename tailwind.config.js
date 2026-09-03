/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#133863",
        grey: "#7C838B",
        bg: "#0A0E14",
        card: "#10151D",
        teal: "#00D9FF",
      },
      fontFamily: {
        heading: ["var(--font-michroma)", "sans-serif"],
        sub: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
