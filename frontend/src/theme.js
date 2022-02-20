import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  overrides: {
    mui: {
      container: {
        maxWidth: "1080px",
        margin: "auto",
        padding: "0",
        "@media (max-width:1120px)": {
          padding: "0 20px",
        },
        "@media (max-width:599px)": {
          padding: "0 15px",
        },
      },
      logo: {
        height: 30,
        marginRight: 10,
      },
      btnCont: {
        backgroundColor: "#A6C4EB",
        borderRadius: 25,
        marginTop: 20,
        width: 220,
        height: 60,
        display: "flex",
        justifyContent: "center",
        boxShadow: "5px 5px 0px #6599dc",
      },
      btn: {
        background: "#234C4D",
        cursor: "pointer",
        border: 0,
        outline: "none",
        boxShadow: "5px 5px 0px #6599dc",
        height: 40,
        lineHeight: "36px",
        padding: "18px 8px",
        display: "flex",
        alignItems: "center",
        color: "white",
        margin: "auto",
        "@media (max-width:599px)": {
          padding: 10,
        },
        "&:hover": {
          backgroundColor: "#000",
        },
      },
    },
  },
  typography: {
    fontFamily: ['"Mochiy Pop One"', "sans-serif"].join(","),

    h1: {
      fontWeight: 400,
      fontSize: "2.5rem",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
  palette: {
    primary: {
      main: "#7167D9",
    },
  },
});

export default theme;