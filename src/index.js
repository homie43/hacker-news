import React from "react";
import ReactDOM from "react-dom";
import "./style/sass/main.scss";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);
