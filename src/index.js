import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import App from "./containers/App";
import Repository from "./containers/Repository";
import Option from "./containers/Option";

import Header from "./components/Header";

const store = configureStore();

// localStorage.clear();

store.subscribe(() => {
  localStorage["mentatus"] = JSON.stringify(store.getState());
});

console.log(store.getState());

const browserHistory = Router.browserHistory;

// <Route exact path="/" component={App} />

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <div class="wrapper">
        <div class="wrapper__header">
          <Header>
            <ul>
              <li>
                <Link exact to="/">
                  Статус
                </Link>
              </li>
              <li>
                <Link to="/repository">Заключения</Link>
              </li>
              <li>
                <Link to="/option">Настройки</Link>
              </li>
            </ul>
          </Header>
        </div>
        <div class="wrapper__main">
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="repository" component={Repository} />
            <Route path="/option" component={Option} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
