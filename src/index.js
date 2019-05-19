import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import * as serviceWorker from "./serviceWorker";

const store = configureStore();

localStorage.clear();

store.subscribe(() => {
  localStorage["mentatus"] = JSON.stringify(store.getState());
});

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
