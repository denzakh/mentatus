import { createStore } from "redux";
import rootReducer from "../reducers";

export default function configureStore(initialState) {
  let store;

  if (localStorage["mentatus"]) {
    store = createStore(rootReducer, JSON.parse(localStorage["mentatus"]));
  } else {
    store = createStore(rootReducer, initialState);
  }

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
