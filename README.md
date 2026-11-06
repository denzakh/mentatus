# Mentatus

Application for automated psychiatric status writing: left — examination sections, center — section form, right — conclusion text is assembled (can be copied or printed).

## Stack

- React 18, react-redux 9, Redux Toolkit 2, `redux-persist` 6
- TypeScript (Vite, `moduleResolution: "Bundler"`)
- Vite 6 (build and dev server), Vitest 5 + jsdom 30 (tests)
- CSS without preprocessors, icons and manifest — in `public/`

## Quick start

Node.js 24+ required (project tested on Node 24.21 and npm 11.19).

```bash
npm ci
npm run dev        # http://localhost:5173
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` / `npm start` | Vite dev server |
| `npm run build` | production build to `dist/` |
| `npm run preview` | local preview of built `dist/` |
| `npm test` | single run of all tests (`vitest run`) |
| `npm run test:watch` | tests in watch mode |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint 9 (flat config `eslint.config.mjs`) |
| `npm run format` | Prettier 3 for `src/**` |
| `npm run css:audit` | report "defined / used" for CSS classes |

Before commit: `npm run typecheck && npm run lint && npm test && npm run build`.

## `src` structure

```
index.tsx                 entry: Provider + PersistGate + page skeleton
configureStore.ts         RTK store + persistor (throttle 300 ms)
reducers/
  index.ts                root reducer (section slices only)
  sections.ts             "section → initial values" map + fieldSections index
  createSectionSlice.ts   section slice factory (RTK + Immer)
actions/fieldActions.ts   SET_SYMPTOM / SET_TEXT / SET_RADIO
store/
  *Data.ts                section schema: labels, phrases, types, groups (cicle)
  *Store.ts               initial section field values
  *Layout.ts              declarative section form layout
  schemas.ts              "slice → schema" map
  persist.ts              redux-persist config and old key cleanup
lib/
  text/                   conclusion phrase building, date handling
  rules/                  business rules (e.g. empty critique)
  layout/                 layout traversal and visibility conditions
  redux/                  reading store fields and prop comparison for connect
  schema/                 schema work (finding radio group item by id)
components/
  <Section>Manager        section form (wrapper over <Section>)
  <Section>List           conclusion part (via <FieldView>)
  Section/Field/Group/FieldView — schematic rendering primitives
  StaticPage/AboutPage/HelpPage — info pages («О проекте», «Помощь»)
containers/App            work screen layout, header and page switching
types/                    state, schema, layout and props types
```

## How it works

- Store field lives in its section's slice: `state[section][field]` and has shape `{ isChecked }` (checkbox), `{ number }` (radio group) or `{ text }` (text/date).
- Section schema (`store/*Data.ts`) — single source of truth about fields; its completeness is checked by `src/store/schema.test.ts`.
- Section form is described by layout (`store/*Layout.ts`) and rendered by `Section` component; non-standard blocks are connected as `custom`.
- Conclusion is assembled from `*List` and pure functions from `lib/text`, so text logic can be tested without React.
- Only section slices are saved to `localStorage` (`persist:mentatus`); writes are throttled so state is not serialized on every character.

## Tests

```bash
npm test
```

Covers pure functions (`lib/text`, `lib/rules`, `lib/layout`, `lib/schema`), reducers, persist, schema completeness and app smoke mount. Environment — jsdom, global `describe/it/expect/vi`, `src/setupTests.ts` connects `@testing-library/jest-dom`.

## Refactoring documentation

Refactoring stage history and acceptance criteria — in `specs/` (start with `specs/README.md`).

## License

Apache License 2.0, see `LICENSE`.