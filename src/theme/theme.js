import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      lg: 1200,
      md: 900,
      sm: 600,
      xl: 1536,
      xs: 0,
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
      primary: "#4e8897",
      secondary: "#295170",
    },
    background: {
      default: "#376c95",
    },
  },
  typography: {
    h1: {
      fontFamily: "fraunces",
      fontSize: "6rem",
    },
    h2: {
      fontFamily: "fraunces",
      fontSize: "4rem",
    },
    h3: {
      fontFamily: "fraunces",
      fontSize: "3rem",
    },
    h4: {
      fontFamily: "fraunces",
      fontSize: "2rem",
    },
    h5: {
      fontFamily: "fraunces",
      fontSize: "1rem",
    },
    h6: {
      fontFamily: "fraunces",
      fontSize: ".7rem",
    },
  },
});