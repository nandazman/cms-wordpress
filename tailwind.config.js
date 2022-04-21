module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    borderRadius: {
      none: "0",
      sm: "5px",
      DEFAULT: "4px",
      md: "8px",
      lg: "10px",
      full: "9999px",
      large: "12px",
    },
    extend: {
      margin: {
        "15px": "15px",
        "16px": "16px",
        "20px": "20px",
        "30px": "30px",
        "32px": "32px",
        "48px": "48px",
        "50px": "50px",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      colors: {
        "light-blue": "#2D3356",
        "tosca-blue": "#49A0A4",
        black: "#000000",
        "dark-blue": "#1D2038",
        red: "#DA4040",
        gren: "#4DA533",
        yellow: "#F1C244",
        pink: "#fbeadd",
        purple: "#555FAE",
        "light-grey": "#CCCCCC",
        "dark-grey": "#4B,4B50",
        orange: "#E87F2F",
        "greyish-blue": "#8692A6",
      },
      borderColor: {
        "greyish-blue": "#8692A6",
      },
    },

    container: {
      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
      },
    },
    fontSize: {
      subtitle: "1.75rem ",
      large: "1.5rem",
      medium: "1.25rem",
      normal: "1rem",
      "semi-normal": "0.875rem",
      small: "0.75rem",
      caption: "0.625rem",
    },
  },
  plugins: [],
};
