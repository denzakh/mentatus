import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import * as serviceWorker from "./serviceWorker";

import ActivePage from "./components/ActivePage";
import Header from "./components/Header";

const store = configureStore();

// localStorage.clear();

store.subscribe(() => {
  localStorage["mentatus"] = JSON.stringify(store.getState());
});

// console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <div className="wrapper">
      <div className="wrapper__header">
        <Header />
      </div>
      <div className="wrapper__main">
        <ActivePage store={store.getState()} />
      </div>
    </div>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
