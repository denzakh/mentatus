import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export default function configureStore(islocalStorage) {
  let store;

  // подключение сохранения в localStorage
  if (islocalStorage) {
    if (localStorage["mentatus"]) {
      store = createStore(
        rootReducer,
        JSON.parse(localStorage["mentatus"]),
        composeWithDevTools(applyMiddleware(thunk))
      );
    } else {
      store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
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
      composeWithDevTools(applyMiddleware(thunk))
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
