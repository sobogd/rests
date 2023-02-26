import React from "react";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material";
import { store } from "app/store";
import { theme } from "app/styles";
import App from "app";

export const backUrl = "http://localhost:4000";

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
