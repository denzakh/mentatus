import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { connectRoutes } from "redux-first-router";
import { routesMap } from "./containers/Router/";
import history from "./fn/history";

import page from "./reducers/page";
import general from "./reducers/general";
import option from "./reducers/option";
import repository from "./reducers/repository";

export default function configureStore(islocalStorage) {
  let store;

  // router
  const { reducer, middleware, enhancer } = connectRoutes(history, routesMap);

  const rootReducer = combineReducers({
    location: reducer,
    page,
    general,
    option,
    repository
  });
  const middlewares = applyMiddleware(middleware);

  const composeEnhancers = (...args) =>
    typeof window !== "undefined"
      ? composeWithDevTools({})(...args)
      : compose(...args);

  const enhancers = composeEnhancers(enhancer, middlewares);

  // UNCOMMENT TO SEE ROUTING WORK CORRECTLY WITHOUT EXTRA @@INIT DISPATCH
  // const enhancers = compose(enhancer, middlewares);

  // islocalStorage - если true, подключается подключение сохранения в localStorage
  if (islocalStorage) {
    // подключение сохранения в localStorage
    if (localStorage["mentatus"]) {
      store = createStore(
        rootReducer,
        JSON.parse(localStorage["mentatus"]),
        enhancers
      );
    } else {
      store = createStore(rootReducer, enhancers);
    }

    localStorage.clear();
    store.subscribe(() => {
      localStorage["mentatus"] = JSON.stringify(store.getState());
    });

    // без localStorage
  } else {
    store = createStore(rootReducer, enhancers);
  }

  // hot reload
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers");
      store.replaceReducer(nextRootReducer);
    });
  }
  // console.log(store.getState())
  return store;
}
