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
    extend: {
      margin: {
        "15px": "15px",
        "16px": "16px",
        "30px": "30px",
        "32px": "32px",
        "50px": "50px",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
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
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
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
