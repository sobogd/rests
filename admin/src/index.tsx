import React from "react";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";
import store from "./store";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import App from "./app";

export const backUrl = "http://54.79.43.64:4000";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
