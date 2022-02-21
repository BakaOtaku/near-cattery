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
      break: {
        border: "none",
        height: 1.2,
        background: "linear-gradient(to right, #21325E, rgb(21, 101, 192))"
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
    formStyle: {
      formContainer: {
        padding: "40px 26px",
        "@media (max-width:599px)": {
          padding: 10,
        },
      },
      // input and label
      inputContainer: {
        width: "80%",
        margin: "0 40px 30px 40px",
        textAlign: 'left',

        "& input, & textarea": {
          height: "50px",
          borderRadius: 4,
          backgroundColor: "#fff",
          border: "1px solid #6599dc",
          padding: "0 15px",
          fontSize: "16px",
          fontWeight: "500",
          width: "100%",
          color: "black",

          "&:active": {
            border: "1.5px solid #6599dc",
            outline: "none",
          },
          "&:focus": {
            border: "1.5px solid #6599dc",
            outline: "none",
          },
          "&:disabled": {
            pointerEvents: "none",
            userSelect: "none",
            backgroundColor: "#D1D1D1",
            position: "relative",

            "&~label": {
              color: "gray",
            },
          },
        },

        "& textarea": {
          padding: "15px",
          width: "115%",
          minHeight: 100,
          resize: 'vertical'
        },
        "& label": {
          fontSize: 16,
          fontWeight: "500",
          color: "#000",
          marginLeft: "3px",
          marginBottom: "4px",
          display: "block;",

          "& span": {
            color: "#515C72",
            fontSize: "14px",
            fontWeight: "normal",
          },
        },
      },
      label: {
        fontSize: "14px",
        fontWeight: "700",
        color: "#E84142",
        marginLeft: "3px",
        marginBottom: "4px",
        marginTop: 0,
        display: "block;",
      },
      btnWithLoader: {
        paddingLeft: "44px",
        transition: "all 0.3s ease",
      },
      loading: {
        position: "absolute",
        display: "block",
        margin: "auto",
        left: "10px",
        color: "#E84142",
      },
    },
    modalStyle: {
      modalContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "0 20px",
      },
      modal: {
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        width: "500px",
        color: "#000",
        outline: "none",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      },
      graphicSection: {
        position: "relative",
        height: "250px",
        backgroundColor: "#E3DEFF",
        borderRadius: "8px",
        marginTop: "40px",

        "& .iconContainer": {
          position: "absolute",
          top: "-40px",
          left: 0,
          right: 0,
          margin: "20px auto",
        },

        "& svg": {
          display: "block",
          margin: "auto",
          width: "150px",
        },

        "& img": {
          position: "absolute",
          margin: "auto",
          left: 0,
          right: 0,
          display: "block",
          width: 250,
        },
      },
      textSection: {
        marginTop: "26px",

        "& p": {
          textAlign: "center",
          color: "#6E798F",
          fontWeight: "600",

          "& span": {
            fontWeight: "600",
            display: "block",
            wordBreak: "break-all",

            "& a": {
              color: "inherit",
            },
          },
        },

        "& .credit": {
          display: "flex",
          flexDirection: 'column',
          fontSize: "12px",
          marginTop: "40px",
          padding: "0 20px",

          "& span": {
            fontWeight: "normal",

            "&:first-child": {
              marginBottom: '10px',
              fontSize: '14px',
            }
          },
        },
      },

      closeModal: {
        height: "30px",
        width: "30px",
        backgroundColor: "#FFDEDE",
        borderRadius: "15px",
        position: "absolute",
        top: "17px",
        right: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",

        "&:hover": {
          backgroundColor: "#ffc1c1",
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
