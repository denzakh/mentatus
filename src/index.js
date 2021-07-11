import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import * as serviceWorker from "./serviceWorker";

import ActivePage from "./components/ActivePage";
import Header from "./components/Header";
import "./index.css";

const store = configureStore(false); //использовать ли localStorage

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
