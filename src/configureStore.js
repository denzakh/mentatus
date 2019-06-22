import { createStore } from "redux";
import rootReducer from "./reducers";

export default function configureStore(islocalStorage) {
  let store;

  // подключение сохранения в localStorage
  if (localStorage) {
    if (localStorage["mentatus"]) {
      store = createStore(
        rootReducer,
        JSON.parse(localStorage["mentatus"]),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    } else {
      store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    }

    localStorage.clear();

    store.subscribe(() => {
      localStorage["mentatus"] = JSON.stringify(store.getState());
    });

    // без localStorage
  } else {
    store = createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
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
