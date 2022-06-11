import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./scss/main.scss";
import { ModalsProvider } from "@mantine/modals";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ModalsProvider>
                    <App />
                </ModalsProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
