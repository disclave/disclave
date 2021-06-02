module.exports = {
  purge: ['./**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#59d5df',
          DEFAULT: '#00a3ad',
          dark: '#00747e'
        },
        secondary: {
          DEFAULT: '#EEE8A9'
        }
      },
      flex: {
        full: '100%'
      }
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
      visibility: ['group-hover']
    }
  },
  plugins: []
};
