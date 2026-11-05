# Этап 12 — Строгий TypeScript и типы срезов

**Статус:** ⬜ не выполнено.
**Зависимости:** этап 11 (правки `persist.ts` и `createSectionSlice` уже внесены);
этап 6, §6.4 — «ужесточение `strict`» было отложено и осталось невыполненным.
**Приоритет:** P2. Типы сейчас не защищают форму состояния: опечатка в имени
поля ловится только тестом полноты схем.
**Цель:** включить `strict: true`, получить типы полей по разделам и убрать
обходы типов, не меняя поведение и разметку.

## Как выполнять (агенту)

1. Прочитать целиком: этот файл, `tsconfig.json`, `src/types/status.ts`,
   `src/types/schema.ts`, `src/types/layout.ts`, `src/reducers/sections.ts`,
   `src/reducers/createSectionSlice.ts`, `src/lib/redux/index.ts`.
2. Работать по шагам 12.1 → 12.6. После каждого шага — `npm run typecheck`;
   после 12.1 он **временно красный**, это ожидаемо.
3. Один этап = один коммит. Поведение, тексты заключения, разметка и CSS
   не меняются.
4. Заполнить «Итог выполнения» и обновить статус в `specs/README.md`.
5. Если ошибка требует изменения поведения — остановиться и описать блокер.

## Контекст

- `tsconfig.json`: `strict: false`, `allowJs: false`, `jsx: "react-jsx"`,
  `moduleResolution: "Bundler"`, `types: ["vite/client", "vitest/globals"]`,
  `include: ["src"]`.
- Типы состояния (`src/types/status.ts`): `SectionState`/`SectionName` —
  ручной union из 8 имён, `StatusSection = Record<string, FieldValue>`,
  `StatusState = Record<SectionName, StatusSection>`. Имена полей не типизированы.
- `src/store/*Store.ts` объявлены как `const store: StatusSection = { ... }`,
  поэтому `typeof store` не даёт конкретных ключей.
- `src/reducers/createSectionSlice.ts` работает через приведение
  `state[action.payload.name] as MutableField | undefined`.
- Часть пропсов объявлена опциональной, хотя фактически обязательна:
  `ListOfWords`/`ListOfWordsZatrud`/`ListOfSentences` — `dataObj?: Schema`,
  `CheckboxGroup` — `dataBase?: Schema` при `cicle?: string`.
- `lib/text.cicleKeys(dataObj, cicle)` ждёт `Record<string, T>` и `string`.

Проба (одноразовый `tsconfig` с `extends` и `strict: true`, запускать
`npx tsc --noEmit -p <файл>`; в репозиторий файл не добавлять) на baseline
`597b517` даёт **52 ошибки в 17 файлах**:

| Код | Кол-во | Смысл |
|---|---|---|
| TS7006 | 12 | неявный `any` у параметра |
| TS18048 | 10 | значение возможно `undefined` |
| TS7053 | 8 | индексация объекта строкой |
| TS2322 | 7 | несовместимое присваивание |
| TS18047 | 6 | объект возможно `null` |
| TS2345 | 5 | аргумент не того типа |
| TS2538 | 2 | `undefined` как индекс |
| TS2790/TS18046 | по 1 | удаление обязательного поля, `unknown` |

| Файл | Ошибок |
|---|---|
| `src/components/ListOfWords/index.tsx` | 9 |
| `src/store/schema.test.ts` | 7 |
| `src/components/ConclusionPanel/index.tsx` | 7 |
| `src/store/affektLayout.ts` | 4 |
| `src/lib/text/index.ts` | 4 |
| `src/store/persist.test.ts`, `src/reducers/sections.test.ts`,
  `src/components/NachaloList/characterization.test.tsx` | по 3 |
| `src/store/rechLayout.ts`, `src/store/ppLayout.ts`,
  `src/components/ListOfSentences/index.tsx` | по 2 |
| `src/lib/layout/layout.test.ts`, `src/containers/App/index.tsx`,
  `src/components/TabRender/index.tsx`, `src/components/Section/index.tsx`,
  `src/components/RadioOptions/index.tsx`,
  `src/components/CheckboxGroup/index.tsx` | по 1 |

Ожидаемое число после этапа — **0**. Если фактических ошибок больше (например,
добавились после этапа 11) — это нормально, отразить в «Итоге выполнения».

## Шаги

### 12.1. Включить `strict`

`tsconfig.json`: `"strict": false` → `"strict": true`.
Ничего больше в конфиге не менять (`allowJs`, `isolatedModules`, `types`
остаются как есть; `noUncheckedIndexedAccess` в этом этапе **не включать**).

Дальше исправлять по каталогам в порядке: `src/lib` → `src/lib/schema` →
`src/store` → `src/reducers` → `src/components` → `src/containers` → тесты.

### 12.2. Исправления по файлам

**Функции видимости в layout** (`affektLayout.ts:6-16`, `rechLayout.ts:6-9`,
`ppLayout.ts:6-7`, при необходимости остальные `*Layout.ts` — проверить
`grep -rn "= slice =>" src/store`). Типизировать параметр и возврат:

```ts
import type { StatusSection } from "../types/status";

const hasKolebania = (slice: StatusSection): boolean =>
  sliceFlag(slice, "nastroyeniyeKolebania");

const hasNastroyeniyeOptions = (slice: StatusSection): boolean =>
  sliceNumber(slice, "nastroyeniye") !== 0 &&
  sliceNumber(slice, "nastroyeniye") !== 7;
```

**`src/lib/text/index.ts`** — три места:

```ts
// phrase может отсутствовать в служебных записях схемы
export function pickPhrase(
  item?: Pick<SchemaEntry, "phrase" | "phraseM">,
  isMale?: boolean
): string {
  if (!item) {
    return "";
  }
  return (item.phraseM && isMale ? item.phraseM : item.phrase) || "";
}

// undefined и нечисло дают 0, как и раньше (ветка default → "")
export function fingerPhrase(fingerNumber?: number | string): string {
  switch (Number(fingerNumber) || 0) {
    // ...
  }
}

// без номера пункта фразы нет (индекс undefined раньше давал undefined)
export function buildRadioPhrase(
  group?: Pick<RadioGroupSchema, "data" | "before" | "after">,
  index?: number,
  isMale?: boolean
): string {
  if (!group || !group.data || index === undefined) {
    return "";
  }

  const option = group.data[index];
  if (!option) {
    return "";
  }

  return (group.before || "") + pickPhrase(option, isMale) + (group.after || "");
}
```

**`src/components/ConclusionPanel/index.tsx`** — `getSelection()` может вернуть
`null`, `err` имеет тип `unknown`:

```ts
const selection = window.getSelection();
if (!selection) {
  return;
}
// ...
} catch (err) {
  console.warn(
    "Не удалось скопировать заключение:",
    err instanceof Error ? err.message : err
  );
}
```

**`src/components/Section/index.tsx`** (case `"field"`) — имя поля обязательно:

```ts
case "field":
  if (!block.name) {
    return null;
  }
  return <Field name={block.name} ... />;
```

**`src/components/TabRender/index.tsx`** — layout обязателен для `form:
"section"` (это гарантирует `src/sections/registry.test.ts`), но тип
опциональный:

```ts
if (entry.form === "section") {
  const layout = entry.layout;
  if (!layout) {
    return null;
  }
  return (<div key={entry.name}><Section ... layout={layout} /></div>);
}
```

**`src/components/RadioOptions/index.tsx`** — `selected` по умолчанию 0:

```ts
const { name, options, selected = 0, label, variant = "list", ... } = props;
```

**`src/containers/App/index.tsx`** — `getAttribute` возвращает `string | null`:

```ts
const name = e.currentTarget.getAttribute("data-id");
if (name) {
  setActiveTab(name);
}
```

**`src/components/CheckboxGroup/index.tsx`** — после 12.4 `dataBase` обязателен,
плюс защита от пустого `cicle`:

```ts
if (!cicle) {
  return null;
}
```

**`src/lib/layout/layout.test.ts`** — фикстура `visibleWhen` должна возвращать
строго `boolean` (`!!` или выражение-сравнение).

### 12.3. Типы полей по разделам

1. В каждом `src/store/*Store.ts` (8 файлов) заменить аннотацию на `satisfies`,
   чтобы `typeof` сохранил конкретные имена полей:

```ts
// было: const store: StatusSection = { ... };
import type { StatusSection } from "../types/status";

const store = {
  patientId: { number: 0 },
  // ...
} satisfies StatusSection;

export default store;
```

2. `src/reducers/sections.ts` — вывести типы из самих срезов:

```ts
import zhalobyStore from "../store/zhalobyStore";
// ... остальные 7 импортов

const sections = {
  zhaloby: zhalobyStore,
  anamnez: anamnezStore,
  sostoyanie: sostoyanieStore,
  affekt: affektStore,
  rech: rechStore,
  kognit: kognitStore,
  pp: ppStore,
  diagnoz: diagnozStore
} satisfies Record<string, StatusSection>;

export type SectionStateMap = typeof sections;
export type SectionName = keyof SectionStateMap;
export type StatusState = SectionStateMap;
export type SectionState<K extends SectionName> = SectionStateMap[K];
export type FieldName = {
  [K in SectionName]: keyof SectionStateMap[K] & string;
}[SectionName];

export default sections;
```

В этом же файле убрать `SectionName` из импорта `../types/status` (тип теперь
объявлен здесь), оставить только `StatusSection`; `fieldSections` продолжает
использовать `Record<string, SectionName>`.

3. `src/types/status.ts` — оставить `CheckboxField`/`RadioField`/`TextField`/
   `FieldValue`/`StatusSection`, а `SectionName`/`StatusState` **реэкспортировать**,
   чтобы не менять 20+ импортов:

```ts
export type {
  SectionName,
  StatusState,
  SectionState,
  FieldName,
  SectionStateMap
} from "../reducers/sections";
```

Цикл `types/status ↔ reducers/sections` состоит только из `import type` /
`export type` и стирается при сборке — это допустимо, но других циклических
импортов добавлять нельзя.

4. `src/reducers/index.ts` — сохранить точные типы состояния:

```ts
import type { SectionName, SectionStateMap, StatusSection } from "./sections";

type SectionReducers = {
  [K in SectionName]: Reducer<SectionStateMap[K]>;
};

const sectionReducers = (Object.keys(sections) as SectionName[]).reduce(
  (reducers, name) => {
    reducers[name] = createSectionSlice(name, sections[name]).reducer;
    return reducers;
  },
  {} as SectionReducers
);
```

Если TypeScript потребует привести результат `reduce` (ковариантность
`Reducer<S>`), допустим **один** документированный `as SectionReducers` —
больше приведений в этом файле быть не должно.
`export type RootState = ReturnType<typeof rootReducer>` остаётся: после
точной типизации `RootState.sostoyanie.pol` получает конкретный тип поля.

5. `src/reducers/createSectionSlice.ts` — сделать фабрику generic и убрать
`MutableField`, заменив приведение предикатами формы поля:

```ts
import type { StatusSection } from "../types/status";
import {
  isCheckboxField,
  isRadioField,
  isTextField
} from "../types/status";

export default function createSectionSlice<S extends StatusSection>(
  name: string,
  initialState: S
) {
  return createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(setSymptom, (state, action) => {
          // индексация по имени поля: драфт сужается до общего типа среза
          const field = (state as StatusSection)[action.payload.name];
          if (isCheckboxField(field)) {
            field.isChecked = !field.isChecked;
          }
        })
        .addCase(setText, (state, action) => {
          const field = (state as StatusSection)[action.payload.name];
          if (isTextField(field)) {
            field.text = action.payload.text;
          }
        })
        .addCase(setRadio, (state, action) => {
          const field = (state as StatusSection)[action.payload.name];
          if (isRadioField(field)) {
            field.number = action.payload.number;
          }
        });
    }
  });
}
```

Предикаты добавить в `src/types/status.ts`:

```ts
export function isCheckboxField(
  value: FieldValue | undefined
): value is CheckboxField {
  return !!value && value.isChecked !== undefined;
}

export function isRadioField(value: FieldValue | undefined): value is RadioField {
  return !!value && value.number !== undefined;
}

export function isTextField(value: FieldValue | undefined): value is TextField {
  return !!value && value.text !== undefined;
}
```

Поведение то же: чужие поля по-прежнему игнорируются (тест
`src/reducers/sections.test.ts` это фиксирует).

### 12.4. Обязательные пропсы вместо «опциональных по факту»

- `src/components/ListOfWords/index.tsx`: `dataObj: Schema` (убрать `?`).
- `src/components/ListOfWordsZatrud/index.tsx`: `dataObj: Schema`.
- `src/components/ListOfSentences/index.tsx`: `dataObj: Schema`.
- `src/components/CheckboxGroup/index.tsx`: `dataBase: Schema`, `cicle: string`.
- `src/components/Group/index.tsx`: `dataBase: Schema` (прокидывает в группу).
- `src/components/FieldView/index.tsx`: `dataObj: Schema`.

Правило: если компонент без пропса падает (`dataObj[beforeKey]`,
`Object.keys(dataBase)`), пропс обязателен. Обратная замена — только вместе
с явным fallback-поведением.

### 12.5. Тест: имена полей в layout

Новый файл `src/sections/layout-names.test.ts` — проверка, что layout не ссылается на
несуществующие поля (типы этого не ловят, потому что `LayoutBlock.name`
остаётся `string`):

```ts
import { sectionsRegistry } from "./registry";
import sections from "../reducers/sections";
import type { Layout, LayoutBlock } from "../types/layout";
import type { SectionName } from "../types/status";

// блоки layout в глубину
function blocks(layout?: Layout): LayoutBlock[] {
  if (!layout) {
    return [];
  }

  return layout.reduce<LayoutBlock[]>(
    (all, block) => all.concat(block, blocks(block.blocks)),
    []
  );
}

const names = Object.keys(sectionsRegistry) as SectionName[];

describe("layout разделов", () => {
  it("все поля layout есть в срезе и в схеме", () => {
    names.forEach(name => {
      const entry = sectionsRegistry[name];

      blocks(entry.layout).forEach(block => {
        if (block.type !== "field" || !block.name) {
          return;
        }

        expect(sections[name][block.name], `${name}.${block.name}`).toBeDefined();
        expect(entry.schema[block.name], `${name}.${block.name}`).toBeDefined();
      });
    });
  });

  it("каждая группа ссылается на непустой цикл схемы", () => {
    names.forEach(name => {
      const entry = sectionsRegistry[name];

      blocks(entry.layout).forEach(block => {
        if (block.type !== "group") {
          return;
        }

        expect(block.cicle, name).toBeTruthy();

        const keys = Object.keys(entry.schema).filter(
          key => entry.schema[key].cicle === block.cicle
        );

        expect(keys.length, `${name}.${block.cicle}`).toBeGreaterThan(0);
      });
    });
  });
});
```

### 12.6. Линт и тестовые данные

1. `eslint.config.mjs`: `"@typescript-eslint/no-explicit-any": "error"`.
2. Убрать `any` из `src`: ожидаемые места — `src/store/persist.test.ts`
   (`Record<string, any>` в `readSavedState`), `src/reducers/sections.test.ts`,
   `src/store/schema.test.ts`. Заменять на `unknown` и точечные приведения
   внутри теста.
3. `src/store/schema.test.ts`: типизировать хелперы
   (`isServicePhrase(key: string): boolean`,
   `storeKeyByType(type: FieldType): keyof FieldValue | null`), итерировать
   `(Object.keys(sections) as SectionName[])`, а `orientir` индексировать
   через `const GENDERS = ["w", "m"] as const`.
4. `src/components/NachaloList/characterization.test.tsx`: не собирать
   фикстуры вида `{ number: undefined }`; использовать хелпер
   `const radio = (number: number): FieldValue => ({ number });`.
5. `src/lib/redux/index.test.ts`, `src/reducers/sections.test.ts` — тип
   `Record<string, SectionName>` вместо безымянных `{}` для карт.

## Критерии приёмки

- `tsconfig.json`: `"strict": true`, остальные поля без изменений.
- `npm run typecheck` — **0 ошибок** (было 52).
- `grep -rn ": any" src` — пусто; `grep -rn "as MutableField" src` — пусто;
  `grep -rn "@ts-ignore\\|@ts-expect-error" src` — пусто.
- `src/types/status.ts` экспортирует `SectionName`, `StatusState`,
  `SectionState`, `FieldName`, `SectionStateMap` (реэкспорт из
  `reducers/sections`), `FieldValue`, `StatusSection` и три предиката формы.
- `src/store/*Store.ts` объявлены через `satisfies StatusSection`.
- `src/sections/layout-names.test.ts` зелёный (2 теста минимум).
- Все существующие тесты зелёные, тексты заключения и разметка не изменились
  (`git diff` по `src/components/*List` и `src/lib/text` содержит только типы).

## Проверка

```bash
npm run typecheck
npm test
npm run lint
npm run build
grep -rn ": any" src || echo "any нет"
grep -rn "as MutableField" src || echo "приведения нет"
```

Ожидание: сборка `dist/` проходит, модулей ~167 (не больше), тестов ≥ 233
(231 базовых + новые в `layout-names.test.ts`).

## Риски

- **Generic `createSectionSlice<S>` и Immer**: драфт нельзя индексировать
  строкой — используется один документированный `as StatusSection`; другие
  приведения не добавлять.
- **`satisfies` не меняет рантайм** (объект остаётся объектом), но убирает
  аннотацию, поэтому ошибки формы поля теперь ловятся компилятором — это
  ожидаемый эффект.
- **Не глушить ошибки** через `!`, `as any` или `// @ts-expect-error`.
  Если без приведения не обойтись — описать причину в «Итоге выполнения».
- **Цикл `types/status ↔ reducers/sections`** допустим только как
  `import type`/`export type`. Если TS начнёт выдавать `implicitly has type
  'any'`, перенести `SectionName`/`StatusState` в `reducers/sections.ts`
  и импортировать их оттуда напрямую (без реэкспорта).
- **`strict` может вскрыть реальный баг** (например, падение `ListOfWords`
  без `dataObj`) — исправлять по месту, а не ослаблять тип.

## Границы этапа

- Не менять CSS, разметку, тексты заключения, схемы и layout.
- Не менять форму стора, `persistConfig` (этап 11) и ключ `persist:mentatus`.
- Не включать `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
  и другие дополнительные флаги — отдельная задача.
- Не переводить `LayoutBlock.name` на `FieldName` (это потребует правок всех
  `*Layout.ts`; вместо этого — тест 12.5).

## Итог выполнения

- [ ] `strict: true` включён; фактическое число ошибок «до»: ___.
- [ ] `npm run typecheck` — 0 ошибок.
- [ ] Типы выведены из `*Store.ts` (`satisfies`), `FieldName`/`SectionState`
      доступны, `as MutableField` удалён.
- [ ] Обязательные пропсы сделаны обязательными (список файлов: ___).
- [ ] Добавлен `src/sections/layout-names.test.ts` (тестов: ___).
- [ ] `any` в `src` отсутствует; `no-explicit-any` = error.
- [ ] `npm test` / `npm run lint` / `npm run build`: ___ тестов, ___ модулей.
- [ ] Статус этапа обновлён в `specs/README.md`.



