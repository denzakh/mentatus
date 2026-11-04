# Спеки рефакторинга Mentatus

Эта папка — набор самодостаточных спек по этапам рефакторинга. Каждый файл можно
открыть в отдельной сессии и выполнить независимо: внутри есть необходимый контекст,
точные пути, шаги, критерии приёмки и проверка.

## Дорожная карта

| # | Этап | Файл | Статус | Зависит от |
|---|------|------|--------|------------|
| 1 | Разбиение `psystatus` на срезы по разделам | `01-slices.md` | ✅ выполнено | — |
| 2 | Схемный рендеринг разделов из `store/*Data.js` | `02-schema-rendering.md` | ✅ выполнено | 1 |
| 3 | `redux-persist` вместо самописного localStorage | `03-redux-persist.md` | ✅ выполнено | 1 |
| 4 | Обновление стека (Vite + React 18 + RTK + vitest) | `04-stack-upgrade.md` | ✅ выполнено | 1–3 |
| 5 | Чистка мёртвых CSS-классов | `05-css-cleanup.md` | ⏳ | 4 |
| 6 | Перевод на TypeScript | `06-typescript.md` | ✅ выполнено | 4–5 |

Правило: этапы выполняются по порядку, каждый — отдельный PR/коммит с зелёными
тестами и сборкой. Два этапа в одном изменении не смешивать.

## Текущее состояние (baseline после этапа 4)

- Стек: React 18.3, react-dom 18.3, react-redux 9.3, redux 5.0,
  @reduxjs/toolkit 2.14, redux-persist 6, classnames 2.5. CRA (`react-scripts`),
  `immutability-helper` и service worker удалены.
- Node v24.21.0, npm 11.19.0. `npm install` работает, сеть до npm есть.
- Сборка и dev: Vite 6 (`npm run dev`, `npm run build` → `dist/`,
  `npm run preview`); конфиг — `vite.config.js` (`base: "./"`,
  `publicDir: "public"`, vitest в секции `test`). Entry — корневой `index.html`
  и `src/index.jsx` (`createRoot`, React 18).
- Стор: `combineReducers({ option, zhaloby, anamnez, sostoyanie, affekt, rech, kognit, pp, diagnoz })`;
  срезы собирает фабрика `src/reducers/createSectionSlice.js` (RTK + Immer),
  стор — `configureStore` из RTK (`src/configureStore.js`).
- Монолитный `psystatus` удалён, поля живут в `state[section][field]`.
- Персист: `redux-persist@6`, конфиг — `src/store/persist.js` (whitelist срезов,
  `key: "mentatus"`, `version: 2`, ключ в localStorage — `persist:mentatus`),
  `PersistGate` в `src/index.jsx`; старый ключ `mentatus:v2` удаляется при старте.
- Чтение поля: `fieldOf(state, name)` / `sectionOf(name)` из `src/lib/redux/index.js`.
- Экшены: `SET_SYMPTOM` / `SET_TEXT` / `SET_RADIO` — креаторы
  `src/actions/fieldActions.js` (RTK `createAction`, данные в `payload`);
  `src/actions/{symptom,text,radio}Action` — ре-экспорты для совместимости.
- Схемы разделов: `src/store/*Data.js`; начальные значения: `src/store/*Store.js`.
  Полноту схем (поле → `section`/`type`) проверяет `src/store/schema.test.js`,
  карта схем — `src/store/schemas.js`.
- Рендеринг: `*Manager` → `<Section section dataBase layout />`
  (раскладка — `src/store/*Layout.js`), `*List` → `<FieldView>` по типу поля,
  примитивы — `src/components/{Field,Group,Section,FieldView}`.
- Тесты: 7 сьютов / 91 тест (`src/lib/text`, `src/lib/rules`, `src/lib/layout`,
  `src/reducers`, `src/store`, smoke `src/index.test.jsx`).
  `npm test` = `vitest run` (один прогон, без watch), `npm run test:watch` —
  режим разработки. Окружение jsdom, глобальные `describe/it/expect/vi`,
  `src/setupTests.js` подключает `@testing-library/jest-dom/vitest`.
- Линт: ESLint 9, плоский конфиг `eslint.config.mjs` (`@eslint/js` +
  `eslint-plugin-react`, `react/prop-types` off, `no-unused-vars` warn).
  `npm run lint` — без ошибок.
- `grep -rn "process.env" src` — пусто (service worker удалён).

## Baseline после этапа 6 (TypeScript)

- Вся `src` — TypeScript (`.ts`/`.tsx`), `allowJs: false`; конфиг — `tsconfig.json`
  (`strict: false`, `moduleResolution: "Bundler"`, `jsx: "react-jsx"`),
  `src/vite-env.d.ts`, проверка — `npm run typecheck` (`tsc --noEmit`).
- Типы состояния — `src/types/status.ts` (`FieldValue`, `SectionName`,
  `StatusSection`, `StatusState`), схем — `src/types/schema.ts`,
  раскладок — `src/types/layout.ts`, общих пропсов — `src/types/components.ts`.
- `RootState` — `ReturnType` корневого редьюсера (`src/reducers/index.ts`),
  используется в `connect` и `persist`.
- Линт TS — через `typescript-eslint` в том же плоском конфиге; vitest
  подхватывает `*.test.{ts,tsx}`, `setupFiles` — `src/setupTests.ts`.
- Проверки этапа: `tsc --noEmit` — чисто, 91 тест, сборка `dist/` (169 модулей),
  `eslint src` — 0 ошибок. Следующий шаг по спеке 6.4 — поэтапное включение
  `strict` (сначала `src/lib` и `src/reducers`).


## Общие соглашения

- Стиль: Prettier (`.prettierrc`: printWidth 80, 2 пробела, двойные кавычки,
  без trailing comma, arrowParens avoid). ESLint 9: плоский конфиг
  `eslint.config.mjs` (`@eslint/js` + `eslint-plugin-react`).
- Комментарии и тексты — на русском, как в коде.
- Поле стора имеет форму `{ isChecked }` | `{ number }` | `{ text }`.
- Схема поля (`*Data.js`): `label`, `phrase`, `section`, `type`
  (`boolean` | `radio` | `string` | `text`), `cicle`, `hint`, `before`/`after`/`not`.
- Перед коммитом: `npm test` + `npm run build` + `npm run lint`.

## Как запускать этап в отдельной сессии

1. Открыть `specs/NN-*.md`, прочитать «Цель», «Контекст», «Зависимости».
2. Убедиться, что предыдущие этапы в статусе ✅ (иначе сначала они).
3. Выполнить «Шаги» по порядку, не выходя за «Границы этапа».
4. Прогнать «Проверку» — все команды должны быть зелёными.
5. Обновить статус этапа в таблице выше и закоммитить отдельно.

## Общий Definition of Done

- `npm test` — все тесты зелёные (один прогон `vitest run`, без watch).
- `npm run build` — успешно (`dist/`).
- `npm run lint` — без ошибок.
- Нет регрессий по ручному чек-листу ниже.

## Ручной регрессионный чек-лист

1. «Общее состояние»: дата/пол/место осмотра, недобровольный осмотр, сознание,
   контакт, впечатление, критика.
2. «Анамнез»: чекбоксы, «не показывать», текст.
3. «Жалобы»: чекбоксы, текст; скрытие при нарушенной речи/контакте/сознании.
4. «Аффект»: настроение, тревога, сон, аппетит, зависимые блоки.
5. «Речь и мышление», «Интеллект и память» (ориентировка, пальцы), «Психопродукция».
6. «Диагноз»: МКБ-10, основной/доп., рекомендации.
7. Заключение справа собирается по смыслу; «Копировать» и «Печать».
8. Переключение вкладок; перезагрузка страницы (после этапа 3 — состояние сохраняется).
