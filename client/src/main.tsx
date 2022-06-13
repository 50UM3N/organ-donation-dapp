import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./scss/main.scss";
import { ModalsProvider } from "@mantine/modals";
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ModalsProvider>
                    <App />
                </ModalsProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
// ReactDOM.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <BrowserRouter>
//                 <ModalsProvider>
//                     <App />
//                 </ModalsProvider>
//             </BrowserRouter>
//         </Provider>
//     </React.StrictMode>,
//     document.getElementById("root")
// );
