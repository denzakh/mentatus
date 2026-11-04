# Этап 6 — Перевод проекта на TypeScript

**Статус:** ⏳ запланировано.
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
