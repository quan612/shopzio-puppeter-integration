module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        "1/4": "24%",
        "1/2": "50%",
        "3/4": "75%",
        print: "680px",
      },
      height: {
        "1/4": "25%",
        card: "315px",
      },
      screens: {
        680: "680px",
      },
      fontSize: {
        small: "0.5rem",
      },
    },
  },
  variants: {
    extend: { opacity: ["disabled"], cursor: ["disabled"] },
  },
  plugins: [],
};
