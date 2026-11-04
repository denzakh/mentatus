import { createStore } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers";
import withPersist, { clearLegacyState } from "./store/persist";

/*
Стор с персистом: корневой редьюсер обёрнут persistReducer (см.
`src/store/persist.js`), а persistor синхронизирует whitelisted-срезы
с localStorage.
*/
export default function configureStore() {
  // старый самописный формат больше не читаем — чистим ключ
  clearLegacyState();

  const store = createStore(
    withPersist(rootReducer),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const persistor = persistStore(store);

  // hot reload: подменяем корневой редьюсер, сохраняя обёртку персиста
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers").default;
      store.replaceReducer(withPersist(nextRootReducer));
    });
  }

  return { store, persistor };
}
