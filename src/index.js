import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import configureStore from "./configureStore";
import * as serviceWorker from "./serviceWorker";
import App from "./containers/App";

//если передать аргумент true, подключается сохранения в localStorage
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
