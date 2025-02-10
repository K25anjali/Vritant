/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Montserrat", "sans-serif"],
      },
      colors: {
        "gradient-purple-pink": {
          500: "#9f7aea", // Purple
          600: "#805ad5", // Dark Purple
        },
        "gradient-blue-teal": {
          500: "#63b3ed", // Blue
          600: "#4299e1", // Dark Blue
        },
      },
      backgroundImage: {
        "gradient-to-r-purple-pink": "linear-gradient(to right, #9f7aea, #ed64a6)", // Gradient from Purple to Pink
        "gradient-to-r-blue-teal": "linear-gradient(to right, #63b3ed, #38b2ac)", // Gradient from Blue to Teal
      },
    },
  },
  plugins: [],
};
