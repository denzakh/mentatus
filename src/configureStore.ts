import { configureStore as rtkConfigureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers";
import withPersist, { clearLegacyState } from "./store/persist";

/*
Стор с персистом: корневой редьюсер обёрнут persistReducer (см.
`src/store/persist.ts`), а persistor синхронизирует whitelisted-срезы
с localStorage.

Стор собирается `configureStore` из RTK: devtools, thunk и проверка
сериализуемости включены по умолчанию. Экшены redux-persist несериализуемы
по своей природе, поэтому исключаем их из проверки.

`throttle` в конфиге персиста: без него состояние сериализуется в localStorage
на каждый экшен, то есть на каждый символ при вводе в поле.
*/
export default function configureStore() {
  // старый самописный формат больше не читаем — чистим ключ
  clearLegacyState();

  const store = rtkConfigureStore({
    reducer: withPersist(rootReducer),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "persist/PERSIST",
            "persist/REHYDRATE",
            "persist/FLUSH",
            "persist/PAUSE",
            "persist/PURGE",
            "persist/REGISTER"
          ]
        }
      }),
    devTools: true
  });

  return { store, persistor: persistStore(store) };
}

// тип стора приложения и его dispatch — для типизированных хуков (lib/redux/hooks)
export type AppStore = ReturnType<typeof configureStore>["store"];
export type AppDispatch = AppStore["dispatch"];
