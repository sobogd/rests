import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { store } from "./app/store";
import { theme } from "./app/styles";
import App from "./app";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
            <BrowserRouter>

            <App />
            </BrowserRouter>
            </ThemeProvider>
        </Provider>

)

