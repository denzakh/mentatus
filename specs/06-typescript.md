# Этап 6 — Перевод проекта на TypeScript

**Статус:** ✅ выполнено (см. «Итог выполнения» в конце).
**Зависимости:** этапы 4–5.
**Цель:** типизировать код постепенно, без «большого взрыва».

## Контекст

- Проект на JS/JSX (после этапа 4 — Vite).
- Ключевые модули: `src/lib/**` (чистые функции), `src/reducers/**`,
  `src/store/**` (схемы и начальные значения), `src/components/**`,
  `src/containers/**`, `src/index.js`.
- Формы поля: `{ isChecked: boolean }` | `{ number: number }` | `{ text: string | false }`.
- Срезы: `state[section][field]`, см. `01-slices.md`.

## Шаги

### 6.1. Зависимости и конфиг

```bash
npm i -D typescript @types/react @types/react-dom @types/node
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": false,
    "allowJs": true,
    "checkJs": false,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "types": ["vite/client"]
  },
  "include": ["src"]
}
```

`src/vite-env.d.ts`: `/// <reference types="vite/client" />`.

### 6.2. Базовые типы

`src/types/status.ts`:

```ts
export type FieldValue =
  | { isChecked: boolean }
  | { number: number }
  | { text: string | false };

export type SectionName =
  | "zhaloby" | "anamnez" | "sostoyanie" | "affekt"
  | "rech" | "kognit" | "pp" | "diagnoz";

export type StatusSection = Record<string, FieldValue>;
export type StatusState = Record<SectionName, StatusSection> & {
  option: { name: string; activePageName: string };
};
```

### 6.3. Порядок перевода (от простого к сложному)

1. `src/lib/text/*`, `src/lib/rules/*`, `src/lib/redux/*` → `.ts` (чистые функции).
2. `src/store/*Data.js` → `.ts` (типы схемы: `FieldSchema`, `RadioGroupSchema`).
3. `src/reducers/*` → `.ts` (`createSectionSlice`/`createSectionReducer`, `sections`, `option`).
4. `src/actions/*` → `.ts`.
5. `src/components/**` → `.tsx` (начать с generic-полей: `Checkbox`, `Textarea`,
   `RadioList`, `FreeText`, …).
6. `src/containers/**`, `src/index.js` → `.tsx`.
7. `src/configureStore.js`/`src/store/persist.js` → `.ts`.

### 6.4. Ужесточение

После перевода папки включать `strict` поэтапно. Приоритет — `src/lib` и
`src/reducers`. Цель — `strict: true` для всей `src` и удаление `allowJs` в конце.

## Критерии приёмки

- `npx tsc --noEmit` — без ошибок.
- `npm run build`, `npm test`, `npm run lint` — зелёные.
- Новый код пишется на TS; `allowJs` остаётся только для непереведённых файлов.

## Проверка

```bash
npx tsc --noEmit
npm test
npm run build
```

## Риски

- **Типы событий** в обработчиках: `React.ChangeEvent<HTMLInputElement>`,
  `React.MouseEvent<HTMLElement>`.
- **`connect`** из react-redux 9 типизируется через `ConnectedProps`/`RootState`.
- **Схемы `*Data.js`** неоднородны (`boolean`/`radio`/`string`/`text`) — нужен
  размеченный union и типобезопасный рендер.
- **Не переводить всё сразу** — большой diff и риск регрессий.

## Границы этапа

- Не менять поведение и разметку.
- Не удалять `allowJs`, пока не переведены все файлы.

## Итог выполнения

- Зависимости: `typescript`, `@types/react`/`@types/react-dom` версии 18
  (под React 18.3, а не 19), `@types/node`, `typescript-eslint`
  (devDependencies).
- `tsconfig.json` — по шагу 6.1, но `allowJs: false` (переведена вся `src`),
  `types: ["vite/client", "vitest/globals"]` (тесты используют глобальные
  `describe/it/expect/vi`), `include: ["src"]`. Добавлен `src/vite-env.d.ts`.
- Переведены **все** файлы `src` (`.js`/`.jsx` → `.ts`/`.tsx`, через `git mv`,
  чтобы сохранить историю): `lib`, `actions`, `reducers`, `store`, `components`,
  `containers`, `index.tsx`, тесты и `setupTests.ts`. Импорты без `.js`-
  расширений; `index.html` грузит `/src/index.tsx`.
- Новые типы:
  - `src/types/status.ts` — `FieldValue` (три формы поля), `SectionName`,
    `StatusSection`, `OptionState`, `StatusState`;
  - `src/types/schema.ts` — `FieldType`, `RadioOption`, `FieldSchema`,
    `RadioGroupSchema`, `Schema`, `OrientirPhrases`;
  - `src/types/layout.ts` — `LayoutBlock`/`Layout` (включая `visibleWhen`);
  - `src/types/components.ts` — общие пропсы полей (`FieldOwnProps`),
    представлений (`FieldViewOwnProps`) и списков (`ListOwnProps`),
    `ToggleTabHandler`.
- `FieldValue` объявлен как объединение трёх форм, но в каждой форме перечислены
  все ключи (`number?: undefined` и т.п.), поэтому существующие чтения
  `field.isChecked` / `field.text` / `field.number` остались без правок и при
  этом типизированы.
- `src/lib/**` — типизированы сигнатуры чистых функций (`cicleKeys`,
  `buildListText`, `buildRadioPhrase`, `pickPhrase`, `fingerPhrase`,
  `todayIso`, `formatDate`, `isKritikaEmpty`, `fieldOf`, `flagsOf`,
  `areStatePropsEqual`, `collectVisibility`, `blockKey`).
- Схемы и срезы: `*Data.ts` типизированы как `Schema`, `*Store.ts` — как
  `StatusSection`, `*Layout.ts` — как `Layout`. `schemas.ts` —
  `Record<SectionName, Schema>`.
- Редьюсеры: `createSectionSlice(name, initialState: StatusSection)` с
  внутренней записываемой формой поля; `reducers/index.ts` собирает
  `Record<SectionName, Reducer<StatusSection>>` и экспортирует `RootState`.
- Экшены: `createAction` с типизированными prepare-функциями
  (`setSymptom(name)`, `setText(name, text)`, `setRadio(name, number)`).
- Компоненты: у каждого объявлены `OwnProps`/`StateProps`/`DispatchProps`,
  `connect<StateProps, DispatchProps, OwnProps>`, обработчики событий —
  `React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>`,
  `React.MouseEvent<HTMLElement>`; `Section` типизирован по `Layout`/`Schema`,
  `Field`/`FieldView` — по `ComponentType<FieldOwnProps>` и типам схемы.
- Тесты переведены на `.test.ts`/`.test.tsx`; `persist.test.ts` переписан с
  `done`-колбэка на `async`/`await` (типы vitest не считают `done` вызываемым).
- `vite.config.js`: `setupFiles: ["./src/setupTests.ts"]`,
  `include: ["src/**/*.test.{js,jsx,ts,tsx}"]`.
- `package.json`: добавлен скрипт `typecheck` (`tsc --noEmit`), глобы
  `format`/`lint-staged` расширены на `ts/tsx`.
- `eslint.config.mjs`: добавлен блок `typescript-eslint` для `*.ts/*.tsx`;
  базовый `no-unused-vars` для TS выключен в пользу правила плагина,
  `@typescript-eslint/no-explicit-any` — off.

Итоговое состояние проверок:

- `npx tsc --noEmit` — без ошибок;
- `npm test` — 7 сьютов / 91 тест, зелёные;
- `npm run build` — `dist/` (169 модулей);
- `npm run lint` — 0 ошибок, 0 предупреждений.

Намеренные отклонения (поведение и разметка не меняются):

- `strict: false` — как в шаге 6.1; ужесточение по шагу 6.4 вынесено в следующий
  шаг (сначала `src/lib` и `src/reducers`, затем `src/components`).
- `allowJs: false` вместо «оставить для непереведённых» — непереведённых файлов
  в `src` не осталось.
- В `TabRender` убран невалидный для `div` атрибут `name` (фильтр вкладок и
  раньше использовал `key`), в `SostoyanieList` — неиспользуемый `isAnd="true"`
  у `ListOfWordsZatrud` (компонент всегда передаёт `isAnd={true}` сам).

