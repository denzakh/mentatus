import { createStore } from "redux";
import rootReducer from "./reducers";

// ключ версии: форма state сменилась (срезы по разделам вместо монолита),
// поэтому старые данные прошлой версии не читаем
const STORAGE_KEY = "mentatus:v2";

export default function configureStore(islocalStorage) {
  let store;

  // подключение сохранения в localStorage
  if (islocalStorage) {
    if (localStorage[STORAGE_KEY]) {
      store = createStore(
        rootReducer,
        JSON.parse(localStorage[STORAGE_KEY]),
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

    store.subscribe(() => {
      localStorage[STORAGE_KEY] = JSON.stringify(store.getState());
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
  return store;
}
