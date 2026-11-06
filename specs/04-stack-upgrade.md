# Этап 4 — Обновление стека: Vite + React 18 + RTK + vitest

**Статус:** ✅ выполнено (см. «Итог выполнения» в конце).
**Зависимости:** этапы 1–3 (срезы, persist).
**Цель:** уйти с CRA 1 (`react-scripts` 1.1.4, webpack 3, jest 20) на современный
стек, чтобы `npm test` работал как обычный прогон (без watch).

## Контекст (текущее состояние)

- `package.json`: react 16.14, react-dom 16.14, react-redux 5.1.2, redux 4.2.1,
  react-scripts 1.1.4, classnames 2.2.5, immutability-helper 2.6.6.
- `src/index.js`: `ReactDOM.render(<Provider>...</Provider>, #root)`.
- `src/serviceWorker.jsx`: `serviceWorker.register()`, использует
  `process.env.NODE_ENV` и `process.env.PUBLIC_URL` (единственные `process.env` в `src`).
- `public/index.html` — шаблон CRA с `%PUBLIC_URL%`; ассеты в `public/static/img`.
- Стор: redux 4, самописные экшены (`src/actions/*`), фабрика редьюсеров
  (`src/reducers/createSectionReducer.js`), срезы (`src/reducers/sections.js`).
- Тесты: `*.test.js`, используют глобальные `describe/it/expect` (jest).
- Сборка: `npx react-scripts build` → `build/`.
- `homepage: ""` → приложение хостится в корне.

## Целевой стек (рекомендация)

| Пакет | Было | Станет |
|-------|------|--------|
| react / react-dom | 16.14 | ^18.3 |
| react-redux | 5.1.2 | ^9.1 |
| redux | 4.2.1 | ^5 (идёт с RTK 2) |
| @reduxjs/toolkit | — | ^2.x |
| redux-persist | этап 3 | ^6 |
| сборщик | react-scripts 1.1.4 | vite ^5/^6 + @vitejs/plugin-react |
| тесты | jest 20 (CRA) | vitest ^2/^3 + jsdom |
| classnames | 2.2.5 | оставить |
| immutability-helper | 2.6.6 | убрать (Immer из RTK) |

> Консервативный вариант при проблемах совместимости: RTK 1.9 + redux 4 +
> react-redux 8 + React 18. Функционально то же, меньше риска с redux-persist.

## Почему Vite, а не CRA 5

CRA (включая 5) фактически не поддерживается; Vite быстрее и проще, а vitest —
родной тест-раннер. CRA 5 (webpack 5 + jest 27) — тоже legacy-путь.

## Шаги

### 4.1. Зависимости

```bash
npm i react@^18 react-dom@^18 react-redux@^9 @reduxjs/toolkit@^2 redux-persist@^6
npm i -D vite @vitejs/plugin-react vitest jsdom @testing-library/react @testing-library/jest-dom
npm uninstall react-scripts immutability-helper
```

### 4.2. Vite-конфиг и entry

- Создать корневой `index.html` (Vite использует его, а не `public/index.html`):

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Приложение для написания автоматизированного психиатрического статуса." />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <title>Mentatus</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
  </body>
</html>
```

  Перенести `manifest.json`, `favicon.ico`, `browserconfig.xml`, `CNAME`, `static/img/*`
  в `public/` (Vite копирует `publicDir` как есть). `public/index.html` удалить.

- `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // относительные пути — для GitHub Pages/подпапок
  base: "./",
  publicDir: "public",
  build: { outDir: "dist" },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: []
  }
});
```

- `package.json` scripts:

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "lint": "eslint src --ext .js,.jsx",
  "format": "prettier --write \"src/**/*.{js,jsx,json,css}\"",
  "css:audit": "node scripts/find-unused-css.js"
}
```

### 4.3. React 18 entry

`src/index.js`:

```jsx
import { createRoot } from "react-dom/client";

const { store, persistor } = configureStore();
const container = document.getElementById("root");
createRoot(container).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* существующая разметка wrapper/Header/ActivePage */}
    </PersistGate>
  </Provider>
);
```

### 4.4. Service worker и `process.env`

- `src/serviceWorker.jsx` использует `process.env.NODE_ENV/PUBLIC_URL`; в Vite это
  `import.meta.env.PROD` и `import.meta.env.BASE_URL`.
- Проще **удалить** `serviceWorker.jsx`, вызов `serviceWorker.register()` из `index.js`
  и `public/service-worker.js`; при необходимости PWA — отдельная задача с
  `vite-plugin-pwa`.
- После правок: `grep -rn "process.env" src` должно быть пусто.

### 4.5. RTK: `createSlice` по разделам

Сохранить глобальные типы экшенов, чтобы не переписывать диспатч во всех generic-полях:

```js
// src/actions/fieldActions.js
import { createAction } from "@reduxjs/toolkit";
export const setSymptom = createAction("SET_SYMPTOM", name => ({ payload: { name } }));
export const setText = createAction("SET_TEXT", (name, text) => ({ payload: { name, text } }));
export const setRadio = createAction("SET_RADIO", (name, number) => ({ payload: { name, number } }));
```

Фабрика среза через `extraReducers` (аналог текущей фабрики, но на Immer):

```js
// src/reducers/createSectionSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { setSymptom, setText, setRadio } from "../actions/fieldActions";

export default function createSectionSlice(name, initialState) {
  return createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(setSymptom, (state, { payload }) => {
          const field = state[payload.name];
          if (field && field.isChecked !== undefined) field.isChecked = !field.isChecked;
        })
        .addCase(setText, (state, { payload }) => {
          const field = state[payload.name];
          if (field && field.text !== undefined) field.text = payload.text;
        })
        .addCase(setRadio, (state, { payload }) => {
          const field = state[payload.name];
          if (field && field.number !== undefined) field.number = payload.number;
        });
    }
  });
}
```

В `src/reducers/index.jsx` собрать `combineReducers({ option, ...slices })` из
`src/reducers/sections.js`. Старые креаторы `src/actions/{symptom,text,radio}Action`
можно оставить обёртками над `fieldActions`, чтобы не менять импорты в компонентах.

### 4.6. RTK `configureStore`

```js
import { configureStore as rtkConfigureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers";
import withPersist from "./store/persist";

export default function configureStore() {
  const store = rtkConfigureStore({
    reducer: withPersist(rootReducer),
    middleware: getDefault =>
      getDefault({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/FLUSH"]
        }
      }),
    devTools: true
  });

  return { store, persistor: persistStore(store) };
}
```

Старый `src/configureStore.js` заменить этим кодом.

### 4.7. Тесты на vitest

- Тесты используют глобальные `describe/it/expect` — включить `test.globals: true`.
- `jsdom` — через `test.environment: "jsdom"`.
- `src/setupTests.js` (опционально) — подключить `@testing-library/jest-dom`.
- `npm test` = `vitest run` (прогон всех тестов один раз, без watch).

### 4.8. ESLint

`.eslintrc` сейчас `{ "extends": "react-app" }` (правило из react-scripts). После
удаления react-scripts заменить:

```json
{
  "env": { "browser": true, "es2022": true },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": { "jsx": true }
  },
  "settings": { "react": { "version": "detect" } },
  "rules": { "react/prop-types": "off", "no-unused-vars": "warn" }
}
```

Поставить `eslint`, `eslint-plugin-react` (и `eslint-plugin-vitest-globals`, если нужно).

## Итог выполнения

Фактически сделано (отличия от плана — ниже):

- React 18.3.1, react-dom 18.3.1, react-redux 9.3.1, redux 5.0.1,
  @reduxjs/toolkit 2.14.0, redux-persist 6.0.0, classnames 2.5.1.
- Vite 6.4.5 + @vitejs/plugin-react 4.7.0, vitest 3.2.7 + jsdom 26.1.0,
  @testing-library/{react,dom,jest-dom}.
- `react-scripts`, `immutability-helper`, `src/serviceWorker.jsx`,
  `public/index.html` и CRA-артефакты в корне удалены; service worker не
  регистрируется (PWA — отдельная задача с `vite-plugin-pwa`).
- Entry: корневой `index.html` + `src/index.jsx` (переименован из `index.js`,
  чтобы JSX жил в `.jsx`-файле) с `createRoot`.
- Срезы: `src/reducers/createSectionSlice.js` (RTK `createSlice` + Immer);
  экшены — `src/actions/fieldActions.js` (`createAction`, данные в `payload`),
  старые `actions/{symptom,text,radio}Action` — ре-экспорты.
- Стор: `configureStore` из RTK + `persistStore`; hot-reload через
  `module.hot` убран (Vite сам перезагружает модули).
- Тесты: `npm test` = `vitest run` (91 тест, 7 сьютов, без watch),
  `src/setupTests.js` подключает `@testing-library/jest-dom/vitest`;
  добавлен smoke-тест `src/index.test.jsx` (монтирование приложения).
- Линт: ESLint 9 перешёл на плоский конфиг, поэтому вместо `.eslintrc`
  используется `eslint.config.mjs` (`@eslint/js` + `eslint-plugin-react`,
  `react/prop-types` off, `no-unused-vars` warn, JSX-рантайм автоматический).
  Это единственное намеренное отклонение от шагов 4.8.
- Сборка: `npm run build` → `dist/` (ассеты `./assets/*`, `public/` копируется
  как есть, CNAME/manifest/favicon на месте), `npm run preview` для проверки.
- `grep -rn "process.env" src` — пусто.

Повторная проверка критериев приёмки (этап 4) выявила остатки CRA, которые не были
убраны в первом проходе; удалены:

- `src/serviceWorker.jsx` — единственный оставшийся `process.env` в `src`; из-за
  него `npm run lint` падал (`'process' is not defined`, `no-undef`), а сам файл
  нигде не импортировался.
- `src/reducers/createSectionReducer.js` — мёртвая фабрика редьюсера, всё ещё
  импортировавшая удалённый `immutability-helper`.
- `public/index.html` — шаблон CRA (`%PUBLIC_URL%`), Vite использует корневой
  `index.html`; в `public/` остались только реальные ассеты.
- локальный `build/` (артефакт CRA, в `.gitignore`).

Дополнительно исправлены пути иконок в `public/manifest.json`,
`public/browserconfig.xml`, `public/static/img/site.webmanifest`: они были
абсолютными и указывали на несуществующую папку (`/static/img/favicons/...`) —
при `base: "./"` и деплое в подпапку абсолютные пути тоже ломаются. Теперь пути
относительные и ведут на существующие файлы: `static/img/...` от корня, а в
`site.webmanifest` (он сам лежит в `static/img/`) — просто `android-chrome-*.png`.

Итоговое состояние проверок: `npm test` — 7 сьютов / 91 тест, зелёные;
`npm run build` — `dist/` (169 модулей); `npm run lint` — 0 ошибок
(3 прежних warning `no-unused-vars`); `grep -rn "process.env" src` — пусто.

## Критерии приёмки

- `npm run dev` — приложение открывается и работает как раньше.
- `npm run build` — `dist/` собирается без ошибок.
- `npm test` — **прогон всех тестов один раз**, зелёный, без watch.
- `npm run lint` — без ошибок.
- `grep -rn "process.env" src` — пусто.
- `react-scripts` и CRA-артефакты удалены из зависимостей и скриптов.

## Проверка

```bash
npm test
npm run build
npm run lint
npm run dev   # ручной чек-лист из README.md
```

## Риски

- **redux-persist + redux 5/RTK 2** — при конфликте откат на RTK 1.9 + redux 4.
- **`base: "./"`** — ссылки на ассеты должны быть относительными; проверить деплой в подпапку.
- **Service worker** — удалить, иначе `process.env`/`service-worker.js` сломают сборку.
- **React 18 `createRoot`** — классовые компоненты работают; проверить консоль на
  предупреждения (`findDOMNode`/legacy context).
- **CSS-порядок** — Vite собирает CSS иначе; сверить визуально (особенно `Print.css`).

## Границы этапа

- Не делать схемный рендеринг (этап 2) и чистку CSS (этап 5) в этом же изменении.
- Не переводить на TypeScript (этап 6).
