import React from "react";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";
import store from "./store";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { Layout } from "./features/layout";

export const backUrl = "http://18.156.79.96:4000";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
