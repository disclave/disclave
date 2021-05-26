module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#59d5df",
          DEFAULT: "#00a3ad",
          dark: "#00747e",
        },
      },
      screens: {
        "hover-hover": { raw: "(hover: hover)" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
