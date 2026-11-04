# Этап 3 — `redux-persist` вместо самописного localStorage

**Статус:** ⏳ запланировано.
**Зависимости:** этап 1 (срезы) — ✅.
**Цель:** заменить ручную запись всего state в `localStorage` на `redux-persist`
с whitelist срезов, версионированием и миграциями.

## Контекст (текущее состояние)

- `src/configureStore.js`:
  - `const STORAGE_KEY = "mentatus:v2";`
  - `createStore(rootReducer[, preloadedState], devtools)`;
  - `store.subscribe(() => { localStorage[STORAGE_KEY] = JSON.stringify(store.getState()); });`
  - вызов hot-reload: `require("./reducers")` (известный латентный баг, см. этап 1).
- `src/index.js`: `const store = configureStore(false);` — сохранение **выключено**.
- Состояние: `state.option` + срезы разделов (`zhaloby`…`diagnoz`), см. `01-slices.md`.
- Пакета `redux-persist` нет. Сеть до npm есть.

## Шаги

### 3.1. Установка

```bash
npm i redux-persist@^6
```

Совместим с текущими redux 4 и react-redux 5. Взаимодействие с React 18/RTK — см.
раздел ниже и этап 4.

### 3.2. Конфиг персиста

Создать `src/store/persist.js`:

```js
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sections from "../reducers/sections";

export const PERSIST_VERSION = 2;

export const persistConfig = {
  key: "mentatus",
  version: PERSIST_VERSION,
  storage,
  // сохраняем только предметные срезы; `option` (настройки UI) не сохраняем
  whitelist: Object.keys(sections),
  // при несовместимом изменении формы состояния поднять version и добавить migrate
  migrate: undefined
};

export default function withPersist(rootReducer) {
  return persistReducer(persistConfig, rootReducer);
}
```

### 3.3. `configureStore`

Заменить самописную логику:

```js
import { createStore } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers";
import withPersist from "./store/persist";

export default function configureStore() {
  const store = createStore(
    withPersist(rootReducer),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  const persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers").default;
      store.replaceReducer(withPersist(nextRootReducer));
    });
  }

  return { store, persistor };
}
```

### 3.4. `index.js`

```jsx
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./configureStore";

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* существующая разметка wrapper/Header/ActivePage */}
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
```

### 3.5. Миграция со старого ключа

Старые данные лежат в `localStorage["mentatus:v2"]` (сырой JSON `getState()`).
Варианты:
- не подхватывать (рекомендуется: данные локальные, не критичны) — удалить старый ключ;
- подхватить одноразово: прочитать, положить как `preloadedState` и удалить ключ;
- `migrate: createMigrate({...})` из `redux-persist/lib/createMigrate`.

## Взаимодействие с этапом 4 (RTK)

- Если RTK ещё **не** внедрён — код выше работает как есть.
- Если RTK уже внедрён — `persistReducer` оборачивает корневой редьюсер, а в
  `configureStore` из RTK нужно отключить проверку сериализации для экшенов persist:

```js
middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/FLUSH"]
    }
  })
```

## Критерии приёмки

- После перезагрузки страницы значения разделов сохраняются.
- `state.option` не персистится (или персистится осознанно).
- В `localStorage` лежит ключ `persist:mentatus`, а не сырой `getState()`.
- Тесты и сборка зелёные.

## Проверка

```bash
CI=true npx react-scripts test --env=jsdom
npx react-scripts build
npx eslint src --ext .js,.jsx
```

Ручная: заполнить поля → F5 → значения на месте; очистить `localStorage` → чистое
состояние без ошибок.

## Риски

- **Несовместимость старых данных** — version/migrate или удаление старого ключа.
- **Persist несериализуемых значений** — хранить только срезы с простыми типами.
- **Persist `option`** — не включать в whitelist.

## Границы этапа

- Не менять рендеринг, схемы, стек и RTK.
