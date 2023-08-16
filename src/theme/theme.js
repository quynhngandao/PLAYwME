import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    primary: {
      main: "#305f82",
      light: "#c7dbea",
      dark: "#376c95",
    },
    text: {
      primary: "#1c364b",
      secondary: "#295170",
    },
    background: {
      default: "#376c95",
    },
  },
  typography: {
    h1: {
      fontFamily: "fraunces",
      fontSize: "3rem",
      fontWeight: "bold",
    },
    h2: {
      fontFamily: "fraunces",
      fontSize: "2.25rem",
      textAlign: "center",
      fontWeight: "bold",
    },
    h3: {
      fontFamily: "fraunces",
      fontSize: "1.875rem",
      margin: "25px",
      fontWeight: "bold",
    },
    h4: {
      fontFamily: "fraunces",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h5: {
      fontFamily: "fraunces",
      fontSize: "1.25rem",
    },
    h6: {
      fontFamily: "fraunces",
      fontSize: "0.75rem",
    },
  },
});
