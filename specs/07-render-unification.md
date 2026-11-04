# Этапы 7–10 — Унификация рендеринга (вариант B)

**Статус:** B.1 — ✅ выполнено, B.2–B.4 — ⏳ не начато.
**Зависимости:** этапы 1–6 и обслуживание после этапа 6 (вариант A) — ✅.
**Назначение:** один файл на четыре подэтапа. Каждый подэтап — отдельная сессия и
отдельный PR/коммит; порядок обязателен: **B.1 → B.2 → B.3 → B.4**.

## Цель

Убрать структурное дублирование рендеринга и бизнес-логики:

- 5 независимых списков разделов (`TabMenu`, `TabRender`, `Conclusion`,
  `store/schemas.ts`, `reducers/sections.ts`);
- 11 `*Manager`-компонентов (8 разделов + 3 custom-блока), из которых 7 —
  пятистрочные обёртки над `<Section>`;
- 3 почти одинаковые радиогруппы, 3 текстовых поля, 3 чекбокса;
- правило «контакт недоступен / сознание помрачено» продублировано в
  `Conclusion`, `ZhalobyList`, `RechList`;
- текст «Начало осмотра» (пол, место, ст. 23 ч.4, род) собирается в `render()`
  `NachaloList` и не покрыт тестами;
- 46 файлов с классовыми компонентами, 27 `connect<...>`, 57 `mapStateToProps`,
  13 использований `areStatePropsEqual`.

## Текущее состояние (baseline после варианта A)

- Срезы: `zhaloby`, `anamnez`, `sostoyanie`, `affekt`, `rech`, `kognit`, `pp`,
  `diagnoz`; форма поля — `{ isChecked }` | `{ number }` | `{ text }`.
- Схемы — `src/store/*Data.ts`, раскладки — `src/store/*Layout.ts`,
  карта схем — `src/store/schemas.ts`, срезы — `src/reducers/sections.ts`.
- Примитивы: `Section`, `Field`, `Group`, `FieldView`; `Field.byType`/`byName` и
  `switch` в `FieldView` — два независимых реестра «тип → компонент».
- Компоненты: 49 каталогов, 46 файлов с `extends Component`, 27 `connect`.
- Проверки на момент написания: `typecheck` — 0 ошибок, `npm test` — 8 файлов /
  95 тестов, `lint` — 0, `build` — 164 модуля. `strict: false` (не входит в B).
- `option`-срез, `Kogtest*` и страницы-заглушки удалены (вариант A).

## Общие правила для всех подэтапов

1. Внешний вид и тексты заключения **не меняются**. Перед переносом логики
   добавить характеризационные тесты на текущие строки (включая двойные пробелы
   в тексте ст. 23 и варианты рода).
2. Один подэтап = один PR. После каждого — `typecheck`, `test`, `lint`, `build`
   и ручной чек-лист из `specs/README.md` (вкладки, заключение, копирование,
   печать, перезагрузка с persist).
3. Не менять форму стора, ключ `persist:mentatus`, схемы `*Data.ts`, семантику
   layout и CSS-классы.
4. Импорты без расширений, комментарии на русском, стиль Prettier
   (`printWidth 80`, 2 пробела, двойные кавычки, `trailingComma: none`).
5. Новые модули покрывать unit-тестами; тесты кладутся рядом с модулем.

---

## B.1. Бизнес-правила и тексты заключения → `lib` + тесты

**Статус:** ✅ выполнено.
**Приоритет:** первый. Самый низкий риск и самая большая ценность: логика
появляется в тестах до переделки UI.

### B.1.1. Правила видимости

Создать `src/lib/rules/visibility.ts`. Функции принимают **значения**, а не
стор, поэтому тестируются без Redux:

```ts
export const CONTACT_UNAVAILABLE = 2;
export const CONSCIOUSNESS_CLOUDED = 7;

export interface VisibilityFields {
  kontakt?: number;
  soznanie?: number;
  rechOtkl?: boolean;
  rechNeotvechaet?: boolean;
}

export function isContactUnavailable(kontakt?: number): boolean;
export function isConsciousnessClouded(soznanie?: number): boolean;
// kontakt === 2 || soznanie === 7
export function isDescriptiveHidden(fields: VisibilityFields): boolean;
// rechOtkl || rechNeotvechaet || isDescriptiveHidden
export function isZhalobyHidden(fields: VisibilityFields): boolean;
// rechOtkl || isDescriptiveHidden
export function isRechMainHidden(fields: VisibilityFields): boolean;
```

Перевести на них `mapStateToProps` в `Conclusion`, `ZhalobyList`, `RechList`
(значения по-прежнему достаются через `fieldOf`, меняется только само условие).

### B.1.2. Текст «Начало осмотра»

Создать `src/lib/text/nachalo.ts`. Перенести **дословно** текущую склейку из
`NachaloList`:

```ts
import type { RadioOption } from "../../types/schema";

export interface NachaloInput {
  date: string;                     // уже дд.мм.гггг
  isMale: boolean;
  mestoOsmotra?: RadioOption;
  poNapravleniu: boolean;
  sIstorieiOznakomlen: boolean;
  nedobrovolno: boolean;
  nedobrovolnoPrichina?: RadioOption;
  nedobrovolnoPunkt?: RadioOption;
  nedobrovolnoText?: string | false;
}

export interface NachaloText {
  osmotr: string;
  sIstorieiOznakomlenText: string;
  soglasie: string;
  zakon: string;
  nedobrovolnoText: string;
}

export function buildNachaloText(input: NachaloInput): NachaloText;
```

`NachaloList` после переноса только собирает `NachaloInput` из props и рендерит
5 строк; никаких `=== 2`, `isMale ? "его" : "ее"` и склейки в JSX не остаётся.

### B.1.3. Фраза ориентировки

Создать `src/lib/text/orientation.ts`:

```ts
import type { OrientirSchemaEntry } from "../../types/schema";

export interface OrientationInput {
  notDefined: boolean;   // orientirNot
  time?: number;         // orientirVremia
  place?: number;        // orientirMesto
  person?: number;       // orientirLichnost
  isMale: boolean;
  isRechOtkl: boolean;
}

// "orientir231" | "orientir000"
export function orientationKey(input: OrientationInput): string;
// фраза с фолбэком "" и учётом isRechOtkl
export function orientationPhrase(
  orientir: OrientirSchemaEntry,
  input: OrientationInput
): string;
```

`OrientirovkaList` использует эти функции. Таблица `orientir` в
`src/store/kognitData.ts` уже содержит все 27 комбинаций и `orientir000`
(проверяется тестом `src/store/schema.test.ts`).

### B.1.4. Тесты

- `src/lib/rules/visibility.test.ts`: `kontakt = 2`, `soznanie = 7`, оба,
  `rechOtkl`, `rechNeotvechaet`, пустые значения, границы (1/3/6/8).
- `src/lib/text/nachalo.test.ts`: мужчина/женщина; `poNapravleniu`;
  `sIstorieiOznakomlen`; `nedobrovolno` + каждая причина (5) и каждый пункт (3);
  пустые `mestoOsmotra`/`prichina`/`punkt` (раньше был `TypeError`);
  `nedobrovolnoText`; полное совпадение строк с текущим выводом.
- `src/lib/text/orientation.test.ts`: 27 комбинаций × 2 пола, `orientir000`,
  `isRechOtkl`, неизвестная комбинация → `""`.

### Критерии приёмки B.1

- В `Conclusion`, `ZhalobyList`, `RechList`, `NachaloList`, `OrientirovkaList`
  нет бизнес-условий и склейки фраз — только вызовы `lib`.
- Тексты заключения идентичны прежним (характеризационные тесты).
- Новые тесты зелёные; общее число тестов ≥ 95 + новые; `build`/`lint`/
  `typecheck` — без ошибок.

### Границы B.1

- Не менять разметку, классы, порядок вывода.
- Не менять `NachaloManager` и `OrientirovkaManager` (это формы, не заключение).
- Не трогать `createSectionSlice`, persist, схемы.

---

## B.2. Единый реестр разделов

**Приоритет:** второй. Убирает 7 файлов-обёрток и 4 из 5 списков разделов.

### B.2.1. Реестр

Создать `src/sections/registry.ts`:

```ts
import type { ComponentType } from "react";
import type { ListOwnProps } from "../types/components";
import type { Layout } from "../types/layout";
import type { Schema } from "../types/schema";
import type { SectionName } from "../types/status";

import { sostoyanieLayout } from "../store/sostoyanieLayout";
import sostoyanieData from "../store/sostoyanieData";
// ... остальные schema/layout
import NachaloManager from "../components/NachaloManager";
import OrientirovkaManager from "../components/OrientirovkaManager";
import KritikaManager from "../components/KritikaManager";
import DiagnozManager from "../components/DiagnozManager";
import AnamnezList from "../components/AnamnezList";
// ... остальные *List

export interface SectionEntry {
  name: SectionName;
  // вкладка: символ и подпись; порядок задаёт tabOrder
  tab: { symbol: string; title: string };
  schema: Schema;
  layout?: Layout;                                  // нет у diagnoz
  custom?: Record<string, ComponentType<{ dataBase?: Schema }>>;
  // "section" — рендерить <Section> из schema/layout/custom,
  // иначе — собственная форма (DiagnozManager)
  form: "section" | ComponentType;
}

export const sectionsRegistry: Record<SectionName, SectionEntry> = {
  sostoyanie: {
    name: "sostoyanie",
    tab: { symbol: "ОC", title: "Общее состояние" },
    schema: sostoyanieData,
    layout: sostoyanieLayout,
    custom: { Nachalo: NachaloManager },
    form: "section"
  },
  // ... остальные 7
};

// порядок вкладок (как в TabMenu до рефакторинга)
export const tabOrder: SectionName[] = [
  "sostoyanie", "anamnez", "zhaloby", "affekt",
  "rech", "kognit", "pp", "diagnoz"
];

// порядок и группировка заключения
export interface ConclusionItem {
  section: SectionName;
  List: ComponentType<ListOwnProps>;
  paragraph: 1 | 2 | 3;            // в какой <p> выводится
  hiddenWhenDescriptive?: boolean; // скрывается вместе при isDescriptiveHidden
}

export const conclusionOrder: ConclusionItem[] = [
  { section: "anamnez", List: AnamnezList, paragraph: 2 },
  { section: "sostoyanie", List: SostoyanieList, paragraph: 2 },
  { section: "zhaloby", List: ZhalobyList, paragraph: 2, hiddenWhenDescriptive: true },
  { section: "kognit", List: OrientirovkaList, paragraph: 2, hiddenWhenDescriptive: true },
  { section: "affekt", List: AffektList, paragraph: 2, hiddenWhenDescriptive: true },
  { section: "rech", List: RechList, paragraph: 2, hiddenWhenDescriptive: true },
  { section: "kognit", List: KognitList, paragraph: 2, hiddenWhenDescriptive: true },
  { section: "pp", List: PpList, paragraph: 2, hiddenWhenDescriptive: true },
  { section: "diagnoz", List: DiagnozList, paragraph: 3 }
];
```

Важно: порядок вкладок и заключения **не менять** — он задан текущим UI
(«Ориентировка» идёт до «Аффекта», а `KognitList` — после «Речи»; поэтому в
`conclusionOrder` две записи с `section: "kognit"`).

### B.2.2. Подключение

- `TabMenu`: вместо локального массива —
  `tabOrder.map(name => sectionsRegistry[name].tab)`; `data-id={name}`,
  классы `tab-menu__item`, `is-active`, разметка символа/подписи не меняются.
- `TabRender`: найти `sectionsRegistry[activeTab]`; если `form === "section"` —
  `<Section section={name} dataBase={schema} layout={layout} components={custom} />`,
  иначе `<Form />`. Обёртку `<div key={name}>` сохранить.
- `Conclusion`: оставить три `<p>`; внутри второго — обычные элементы, затем
  `<span>` со скрываемыми (`hiddenWhenDescriptive`) при `isHidden`. Списки и
  порядок брать из `conclusionOrder`; ключи — `` `${item.section}-${index}` ``,
  потому что `kognit` встречается дважды. `NachaloList` остаётся отдельным
  элементом первого абзаца.
- Удалить 7 файлов: `ZhalobyManager`, `AnamnezManager`, `SostoyanieManager`,
  `AffektManager`, `RechManager`, `KognitManager`, `PpManager`.
  Оставить `DiagnozManager` (своя форма), `NachaloManager`,
  `OrientirovkaManager`, `KritikaManager` (custom-блоки).

### B.2.3. Тест реестра

`src/sections/registry.test.ts`:

- ключи `sectionsRegistry` совпадают с `Object.keys(sections)`;
- у каждой записи `entry.name === key`, непустые `tab.symbol`/`tab.title`;
- `entry.schema === schemas[name]` (импорт из `src/store/schemas.ts`);
- `form === "section"` ⇒ `layout` задан;
- `tabOrder`: 8 уникальных имён, каждое есть в реестре;
- `conclusionOrder`: `paragraph` ∈ {1,2,3}; каждая `List` — функция; все 8
  разделов присутствуют; порядок секций совпадает с текущим UI:
  `anamnez, sostoyanie, zhaloby, kognit, affekt, rech, kognit, pp, diagnoz`.

### Критерии приёмки B.2

- `TabMenu`, `TabRender`, `Conclusion` не перечисляют разделы и не импортируют
  `*Manager`/`*List` напрямую (только реестр).
- 7 перечисленных `*Manager` удалены; `grep -rn "ZhalobyManager\|AnamnezManager\|
  SostoyanieManager\|AffektManager\|RechManager\|KognitManager\|PpManager" src`
  — пусто.
- Добавление раздела = запись в реестре + schema/store (± layout, ± custom) без
  правок UI-компонентов.
- DOM вкладок и заключения идентичен прежнему (проверить ручным чек-листом).
- `typecheck`/`test`/`lint`/`build` — зелёные.

### Границы B.2

- Не менять содержимое форм разделов и `*Layout.ts`.
- Не менять порядок вкладок и абзацев заключения.
- Не объединять абзацы `<p>` и не менять вложенность `<span>`.
- Реестр не должен импортироваться из `store`, `reducers`, `lib` (иначе цикл
  `registry → components → store`).

---

## B.3. Унификация полей

**Приоритет:** третий. Убирает тройное дублирование полей и два реестра типов.

### B.3.1. Радиогруппы

Создать презентационный `src/components/RadioOptions/index.tsx`:

```tsx
interface RadioOptionsProps {
  name: string;
  options: RadioOption[];
  selected?: number;
  label?: string;                 // только для variant="inline"
  variant?: "list" | "inline";
  itemClassName?: string;         // radio__item | radio__inline-item
  onChange: (value: number) => void;
}
```

Разметка сохраняется дословно:

| variant | обёртка | пункт | input | label |
|---|---|---|---|---|
| `list` | `.radio__list` | `.radio__item` | `.radio__input` | `.radio__label` |
| `inline` | `.radio__inline` → `.radio__inline-label` (текст + пробел) → `.radio__inline-list` | `.radio__inline-item` | `.radio__input` | `.radio__label` |

`RadioList`, `RadioListInline`, `RadioListKogn` остаются экспортируемыми (их
имена используются в `Field.byName` и layout) и становятся тонкими обёртками:
свой `mapStateToProps` + `<RadioOptions variant=... onChange=... />`.

- `RadioListKogn`: авто-критика через `lib/rules/kritika` (см. B.3.4), без
  локального `kritikaByOption`.
- Общий хелпер чтения: `radioOptionsOf(state, name, dataBase)` и
  `radioSelectedOf(state, name)` в `src/lib/redux` (или локально рядом с полями).

### B.3.2. Текстовые поля

Создать `src/components/TextField/index.tsx` с вариантами:

| variant | обёртка | label | поле |
|---|---|---|---|
| `textarea` | `.textarea` | `.textarea__label` (div) | `<textarea class="textarea__input">` |
| `inline` | `.textarea-inline` → `<label>` | `.textarea-inline__label` (div) | `<textarea class="textarea-inline__input">` |
| `date` | `.date` → `<label>` | `.date__label` (span) | `<input type="date" class="date__input">` |

`Textarea`, `TextareaInline`, `InputDate` остаются экспортируемыми и передают
`variant`. Общий `textOf(state, name): string` и общий dispatch `setText`
убирают три копии `mapStateToProps`/`mapDispatchToProps`. `style` по-прежнему
пробрасывается только у `Textarea` (как сейчас).

### B.3.3. Чекбоксы

`Checkbox` получает `variant: "default" | "otkl" | "pol"`; `CheckboxOtkl` и
`CheckboxPol` остаются тонкими обёртками (имена нужны layout/`byName`).

| variant | обёртка | input | label | id |
|---|---|---|---|---|
| `default` | `<span>` | `.checkbox__input` | `.checkbox__label` | `checkbox-<name>` |
| `otkl` | `.checkbox-otkl` | `.checkbox-otkl__input` | `.checkbox-otkl__label` | `checkbox-otkl-<name>` |
| `pol` | `<span>` | `.checkbox__input` | `.checkbox__pol` + текст пола | `checkbox-pol-<name>` |

`autoKritika` работает только в `default`; `pol` берёт имя `pol` по умолчанию и
не читает `dataBase`. Текст подписи сохранить дословно:
`"Пол: мужской  ⇄"` / `"Пол: женский  ⇄"` (два пробела перед стрелкой).

### B.3.4. Авто-критика и карта рендереров

- В `src/lib/rules/kritika.ts` добавить:

```ts
export const AUTO_KRITIKA_BY_OPTION: Record<number, number> = { 1: 2, 2: 3, 3: 4 };
export function autoKritikaForOption(optionId?: number): number | undefined;
```

  `RadioListKogn` использует её вместо локальной константы; добавить тесты
  (`src/lib/rules/kritika.test.ts`): известные id, неизвестный id, `undefined`.
- Создать `src/components/fields/registry.ts` (или `fieldRenderers.ts`) —
  единственное место соответствий:
  - `formByType: Record<FieldType, ComponentType<FieldOwnProps>>` (сейчас
    `Field.byType`);
  - `formByName: Record<string, ComponentType<FieldOwnProps>>` (сейчас
    `Field.byName`);
  - `viewByType: Record<FieldType, ComponentType<FieldViewOwnProps>>`
    (сейчас `switch` в `FieldView`); выбор `FreeText` vs
    `FreeTextBeforeAndAfter` по `field.before/after` вынести в
    `FreeTextView`/функцию `viewForField(field)`.
  `Field` и `FieldView` используют только этот файл.

### B.3.5. Тесты полей

Добавить `src/testUtils/renderWithStore.tsx` (обёртка `Provider` + тестовый
стор из `configureStore`) и проверить:

- `RadioOptions`: разметка/классы для `list` и `inline`; `onChange(value)`.
- `RadioList`/`RadioListInline`/`RadioListKogn`: клик по пункту отправляет
  `SET_RADIO` с нужным номером; у `Kogn` — дополнительно `kritika`, если она
  пустая; id/классы не изменились.
- `Textarea`/`TextareaInline`/`InputDate`: классы, `type="date"`, ввод текста
  отправляет `SET_TEXT`; `InputDate` не принимает `style` (как раньше).
- `Checkbox`/`CheckboxOtkl`/`CheckboxPol`: классы, `id`, подпись, переключение;
  `autoKritika` выставляется только при пустой критике.
- `Field`/`FieldView`: для каждого типа схемы рендерится ожидаемый компонент
  (по карте из B.3.4).

### Критерии приёмки B.3

- Три радиогруппы используют общий `RadioOptions`; три текстовых поля — общий
  `TextField`; три чекбокса — общий `Checkbox` (обёртки ≤ ~50 строк).
- Локальной константы авто-критики вне `lib/rules` нет.
- `Field`/`FieldView` не содержат собственных карт «тип → компонент».
- DOM, классы и `id` идентичны прежним (тесты разметки + ручной чек-лист).
- `typecheck`/`test`/`lint`/`build` — зелёные.

### Границы B.3

- Не менять CSS и классы, не добавлять CSS-модули.
- Не менять layout и `byName`-имена компонентов.
- Не переводить на hooks (это B.4); допустимы только общие классовые хелперы.

---

## B.4. Функциональные компоненты + hooks

**Приоритет:** последний. Убирает 27 `connect`, 57 `mapStateToProps`,
13 кастомных компараторов и 46 классовых компонентов.

### B.4.1. Типизированные hooks

`src/configureStore.ts` — экспортировать тип dispatch:

```ts
export type AppStore = ReturnType<typeof configureStore>["store"];
export type AppDispatch = AppStore["dispatch"];
```

Создать `src/lib/redux/hooks.ts`:

```ts
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../../reducers";
import type { AppDispatch } from "../../configureStore";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### B.4.2. Порядок перевода

Каждый шаг — самостоятельный коммит с зелёными проверками:

1. Поля: `Field`, `FieldView`, `Group`, `CheckboxGroup`, `RadioOptions`,
   `TextField`, `Checkbox` и обёртки `Radio*`/`Text*`/`Checkbox*`.
2. Примитивы заключения: `ListOfWords`, `ListOfSentences`,
   `OnePraseFromRadio`, `FreeText`, `FreeTextBeforeAndAfter`,
   `ListOfWordsZatrud`.
3. `*List` разделов (12 файлов) и custom-менеджеры `NachaloManager`,
   `OrientirovkaManager`, `KritikaManager`, `DiagnozManager`.
4. Каркас: `Section`, `TabMenu`, `TabRender`, `Conclusion`, `ConclusionPanel`,
   `Header`, `ActivePage`, `App`.

### B.4.3. Правила замены `connect`

- Примитивы: `const value = useAppSelector(state => textOf(state, name))`;
  действия: `const dispatch = useAppDispatch(); dispatch(setText(name, text))`.
- Объекты (`flagsOf`, `collectVisibility`) — либо `shallowEqual` вторым
  аргументом `useAppSelector`, либо `useMemo`:

```tsx
const visible = useAppSelector(
  state => collectVisibility(layout, state[section] || {}),
  shallowEqual
);

const keys = useMemo(() => cicleKeys(dataObj, name), [dataObj, name]);
const flags = useAppSelector(state => flagsOf(state, keys), shallowEqual);
```

- `Section` становится функцией; рекурсивный `renderBlocks/renderBlock`
  выносится в обычные функции/`SectionBlock` (те же `key` и разметка).
- `App` — функция с `useState("sostoyanie")`; `toggleTab` читает `data-id`
  из `event.currentTarget` как сейчас.
- `ConclusionPanel` — функция; DOM-копирование и `window.print()` переносятся
  без изменения поведения.
- После перевода удалить `areStatePropsEqual` из `src/lib/redux` (если не
  осталось использований) и не добавлять новых зависимостей (reselect не нужен).

### Критерии приёмки B.4

- `grep -rn "connect(" src`, `grep -rn "mapStateToProps" src`,
  `grep -rn "mapDispatchToProps" src`, `grep -rn "extends Component" src`,
  `grep -rn "areStatePropsEqual" src` — **пусто**.
- Ввод в поле не перерисовывает `Section` и списки заключения: проверить
  React DevTools Profiler (или тестом со счётчиком рендеров у дочернего
  компонента).
- Нет предупреждений в консоли (keys, controlled inputs, `act`).
- `typecheck`/`test`/`lint`/`build` — зелёные; число тестов не уменьшилось.

### Границы B.4

- Не менять стор, схемы, layout, CSS, тексты и бизнес-правила.
- Не включать `strict`/`noUncheckedIndexedAccess` — это вариант C.
- Не добавлять зависимости (`reselect`, `react-redux`-хуки уже есть).
- Не оптимизировать `React.memo`/`useCallback` без измерения.

---

## Общая проверка (после каждого подэтапа)

```bash
npm run typecheck
npm test
npm run lint
npm run build
node scripts/find-unused-css.js   # после B.2/B.3: не осиротели ли классы
npm run dev                       # ручной чек-лист из specs/README.md
```

Ручной чек-лист: все 8 вкладок открываются и сохраняют значения; заключение
собирается по смыслу; «недобровольный осмотр» и «ориентировка» выводятся верно
для обоих полов; скрытие описательной части при `kontakt=2`/`soznanie=7`;
«Копировать» и «Печать»; F5 — значения на месте.

## Ожидаемый эффект варианта B

| Метрика | До | После |
|---|---|---|
| Списки разделов | 5 | 1 реестр (+ данные `sections`/`schemas`) |
| `*Manager`-обёртки | 7 | 0 |
| `connect<...>` | 27 | 0 |
| `mapStateToProps` | 57 | 0 |
| `areStatePropsEqual` | 13 | 0 |
| Классовые компоненты (файлы) | 46 | 0 |
| Копии логики видимости | 3 | 1 (`lib/rules`) |
| Текст «Начало осмотра» | в `render()` без тестов | `lib/text` + тесты |

## Риски

- **Тексты заключения** — переносить дословно, характеристические тесты до
  изменений (двойные пробелы, «его/ее», «Освидетельствован/а»).
- **Порядок вкладок/абзацев** — задан массивами реестра и тестом; не
  «улучшать» порядок.
- **DOM/классы/id полей** — тесты разметки; CSS-селекторы завязаны на классы.
- **`useSelector` с объектами** — `shallowEqual`, иначе лишние рендеры и
  возможные циклы.
- **Custom-блоки** (`Nachalo`, `Orientirovka`, `Kritika`) — сохранить передачу
  `dataBase` и место в layout.
- **`DiagnozManager`** — единственная форма не на `Section`; в реестре это
  `form: DiagnozManager`, а не `"section"`.
- **`connect` был `pure`** — после перехода на hooks поведение должно совпадать;
  проверять профайлером, а не «на глаз».

## Как запускать подэтап в новой сессии

1. Открыть этот файл, выбрать **первый** подэтап со статусом ⏳.
2. Убедиться, что предыдущие подэтапы ✅ (иначе сначала они).
3. Выполнить шаги B.x.1…B.x.N по порядку, не выходя за «Границы».
4. Прогнать «Общую проверку» и ручной чек-лист.
5. Обновить статус подэтапа в `specs/README.md` и закоммитить отдельно
   (`refactoring B.x: ...`).

Если подэтап не влезает в одну сессию — делить по шагам (`B.2.1`, `B.2.2`…),
но не смешивать разные подэтапы в одном PR.

## Definition of Done подэтапа

- `npm test` — все тесты зелёные, новых падений нет.
- `npm run typecheck` — 0 ошибок.
- `npm run lint` — 0 ошибок.
- `npm run build` — успешно (`dist/`).
- Ручной чек-лист из `specs/README.md` — без регрессий.
- Статус в `specs/README.md` обновлён, изменения закоммичены отдельно.

