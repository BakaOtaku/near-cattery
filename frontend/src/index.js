import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import theme from "./theme";
import { initContract } from './utils/near';


window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>,
      document.querySelector("#root")
    );
  })
  .catch(console.error)
