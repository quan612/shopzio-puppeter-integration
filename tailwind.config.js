module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        "1/4": "24%",
        "1/2": "50%",
        "3/4": "75%",
        "1/3": "32%",
        "85/100": "85%",
        print: "680px",
      },
      minWidth: {
        "1/4": "24%",
        "1/3": "32%",
      },
      height: {
        "1/4": "25%",
        "1/3": "31%",
        card: "300px",
        card350: "340px",
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
