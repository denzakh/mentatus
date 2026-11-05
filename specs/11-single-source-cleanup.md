# Этап 14 — Один источник схем и чистка мёртвого кода

**Статус:** ⬜ не выполнено.
**Зависимости:** этап 12 (строгие типы): удаление и смена сигнатур затрагивают
типизированный код; этапы 11 и 13 не затрагиваются.
**Приоритет:** P2. Убирает дубль «источника правды» и рудименты рефакторинга.
**Цель:** оставить один путь к схемам разделов и удалить код, который больше
никем не используется, не меняя поведение.

## Как выполнять (агенту)

1. Прочитать целиком: этот файл, `src/store/schemas.ts`,
   `src/sections/registry.ts`, `src/store/schema.test.ts`,
   `src/sections/registry.test.ts`, `src/lib/redux/index.ts`,
   `src/actions/fieldActions.ts`, `eslint.config.mjs`.
2. Выполнять шаги 14.1 → 14.6 по порядку; после каждого — `npm run typecheck`
   и целевые тесты.
3. Один этап = один коммит. Логика, разметка, тексты и CSS не меняются.
4. Заполнить «Итог выполнения» и обновить статус в `specs/README.md`.

## Контекст

- `src/store/schemas.ts` — карта «срез → схема». В **проде не импортируется**:
  она нужна только `src/store/schema.test.ts` и `src/sections/registry.test.ts`.
  Реестр `src/sections/registry.ts` импортирует `*Data.ts` напрямую, то есть
  к схемам ведут два пути, хотя этап B.2 объявлял реестр единственным местом.
- `sectionOf` (`src/lib/redux/index.ts:21`) — экспорт без единого вызова.
- `radioOptionsOf(state, fieldName, dataBase)` (`src/lib/redux/index.ts:59-70`)
  игнорирует `state` через `void state`: пункты группы лежат в схеме, а не
  в сторе. Вызовов три (`RadioList`, `RadioListInline`, `RadioListKogn`) плюс
  тест `src/lib/redux/index.test.ts`.
- `import React from "react"` — в 50 файлах `.tsx`, но `React.` используется
  только в `src/components/DiagnozManager/index.tsx:24`
  (`React.ChangeEvent`). Остальные импорты — рудимент CRA; линт их скрывает
  правилом `varsIgnorePattern: "^React$"`.
- `src/actions/{symptom,text,radio}Action/index.tsx` — ре-экспорты
  `fieldActions` «для совместимости» (этап 3). Совместимость больше не нужна:
  из них импортируют 10 компонентов.
- `DiagnozManager` рисует `input`/`textarea` вручную, минуя `TextField` — это
  отдельная задача, в этом этапе не трогается.

## Шаги

### 14.1. Единственный источник схем

Выбранный вариант: **реестр — источник, `src/store/schemas.ts` удаляется**
(обратный вариант — строить реестр из `schemas.ts` — потребовал бы правок
в реестре и не убирает файл).

1. `src/store/schema.test.ts` — заменить импорт и собрать карту из реестра:

```ts
import sections from "../reducers/sections";
import { sectionsRegistry } from "../sections/registry";
import type { Schema } from "../types/schema";
import type { SectionName } from "../types/status";

/* Схемы берутся из реестра разделов — единственного места, где они
   перечислены (`src/sections/registry.ts`). */
const schemas = Object.fromEntries(
  Object.entries(sectionsRegistry).map(([name, entry]) => [name, entry.schema])
) as Record<SectionName, Schema>;
```

Остальные проверки файла не меняются: именно они гарантируют полноту схем
(поле → `section`/`type`, форма поля в сторе, радиогруппы с пунктами,
таблица ориентировки).

2. `src/sections/registry.test.ts` — удалить `import schemas from "../store/schemas"`
   и тест `«ссылается на схемы из store/schemas»`; полноту схем проверяет
   `schema.test.ts`. В комментарии файла убрать упоминание `store/schemas`.

3. Удалить `src/store/schemas.ts`. Проверить:
   `grep -rn "store/schemas\|from \"./schemas\"" src` — пусто (комментарий
   в `src/sections/registry.ts:44` тоже поправить: там перечислены «пять
   файлов», оставить историческую формулировку без ссылки на удалённый файл).

### 14.2. Удалить `sectionOf`

- `src/lib/redux/index.ts`: удалить функцию `sectionOf` и строку о ней в шапке
  файла (`fieldSections` остаётся — им пользуется `fieldOf`).
- Проверка: `grep -rn "sectionOf" src` — пусто.

### 14.3. Убрать фиктивный параметр `state` у `radioOptionsOf`

Новая сигнатура (`src/lib/redux/index.ts`):

```ts
// пункты радиогруппы из схемы раздела (состояние стора не нужно)
export function radioOptionsOf(
  fieldName: string,
  dataBase?: Schema
): RadioOption[] {
  const group = dataBase && dataBase[fieldName];
  return (group && group.data) || [];
}
```

Обновить вызовы:

- `src/components/RadioList/index.tsx:35` — `radioOptionsOf(name, dataBase)`;
- `src/components/RadioListInline/index.tsx:34` — то же;
- `src/components/RadioListKogn/index.tsx:38` — то же;
- `src/lib/redux/index.test.ts:67,73,74` — убрать первый аргумент.

Селектор по-прежнему возвращает массив из схемы (стабильная ссылка), поэтому
перерисовок не прибавится.

### 14.4. Убрать лишние `import React`

1. В 49 файлах `.tsx` удалить строку `import React from "react";`
   (JSX-рантайм автоматический: `jsx: "react-jsx"`, `@vitejs/plugin-react`).
   Проверять каждый файл на `React.` — сейчас такое обращение одно:
   `src/components/DiagnozManager/index.tsx:24`.
2. В `DiagnozManager` заменить тип обработчика на именованный импорт:

```ts
import type { ChangeEvent } from "react";

const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  dispatch(setText(e.target.name, e.target.value));
};
```

3. `eslint.config.mjs` — правило больше не нужно скрывать:

```js
"@typescript-eslint/no-unused-vars": ["warn"]
```

(убрать `varsIgnorePattern: "^React$"`).

4. Проверки: `grep -rn "^import React" src` — пусто; `npm run typecheck`,
   `npm test` (JSX собирается и в тестах через тот же плагин).

### 14.5. Убрать ре-экспорты экшенов

1. Удалить `src/actions/symptomAction/index.tsx`,
   `src/actions/textAction/index.tsx`, `src/actions/radioAction/index.tsx`
   (вместе с пустыми каталогами).
2. В 10 файлах заменить путь импорта на `src/actions/fieldActions`:
   `Checkbox`, `CheckboxOtkl`, `CheckboxPol`, `DiagnozManager`, `InputDate`,
   `RadioList`, `RadioListInline`, `RadioListKogn`, `Textarea`,
   `TextareaInline`. Имена `setSymptom` / `setText` / `setRadio` не меняются.
3. Если в файле два импорта (`Checkbox` — `symptomAction` и `radioAction`),
   объединить в один:

```ts
import { setRadio, setSymptom } from "../../actions/fieldActions";
```

4. Обновить шапку `src/actions/fieldActions.ts`: убрать абзац про ре-экспорты.
5. Проверка:
   `grep -rn "actions/symptomAction\|actions/textAction\|actions/radioAction" src`
   — пусто.

### 14.6. Проверить сборку и граф импортов

```bash
npm run build
```

Модулей должно стать меньше 167 (после удаления трёх ре-экспортов и
`schemas.ts`); новых предупреждений Rollup/Vite быть не должно.
Циклических импортов не появилось: реестр по-прежнему импортирует только
`components`/`store`, а `store`/`reducers`/`lib` не импортируют реестр.

## Критерии приёмки

- `src/store/schemas.ts` удалён;
  `grep -rn "store/schemas" src` — пусто.
- `src/store/schema.test.ts` берёт схемы из `sectionsRegistry` и по-прежнему
  проверяет все 8 разделов (тест «содержит схему для каждого среза» зелёный).
- `grep -rn "sectionOf" src` — пусто.
- `grep -rn "void state" src` — пусто (сигнатура `radioOptionsOf` без `state`).
- `grep -rn "^import React" src` — пусто; `varsIgnorePattern` убран из линта.
- `grep -rn "actions/symptomAction" src` (и `textAction`/`radioAction`) — пусто.
- Число тестов не уменьшилось (231 минус 1 удалённый тест реестра = 230,
  плюс ничего нового; в отчёте указать фактическое число).
- `npm run typecheck`, `npm test`, `npm run lint`, `npm run build` — зелёные.

## Проверка

```bash
npm run typecheck
npm test
npm run lint
npm run build

grep -rn "store/schemas" src || echo "схем-дублей нет"
grep -rn "sectionOf" src || echo "sectionOf нет"
grep -rn "void state" src || echo "фиктивного параметра нет"
grep -rn "^import React" src || echo "React-импортов нет"
grep -rn "actions/symptomAction" src || echo "ре-экспортов нет"
```

Ручная проверка: `npm run dev` — вкладки переключаются, поля вводятся,
заключение собирается, копирование и печать работают.

## Риски

- **Удаление `schemas.ts` без правки `schema.test.ts`** ломает проверку полноты
  схем — это главная гарантия проекта, терять её нельзя.
- **`import React` нельзя удалять там, где есть `React.`** — проверять grep по
  каждому файлу, иначе `typecheck`/рантайм упадут.
- **Имена экшенов не менять**: `SET_SYMPTOM` / `SET_TEXT` / `SET_RADIO` видны
  в тестах и Redux DevTools.
- **Не переносить `schemas.ts` в реестр «наполовину»**: либо файл удалён, либо
  он источник — промежуточное состояние хуже текущего.
- **`radioOptionsOf` остаётся в `lib/redux`**, а не переезжает в реестр полей:
  переезд — отдельная задача.

## Границы этапа

- Не менять схемы `*Data.ts`, `*Layout.ts`, `*Store.ts` и компонентную логику.
- Не менять разметку `DiagnozManager` и не переводить его на `TextField`.
- Не объединять `fieldActions` с чем-либо ещё и не переименовывать экшены.
- Не трогать `persist.ts`, `stateReconciler.ts` (этап 11) и `scripts/*` (этап 13).

## Итог выполнения

- [x] `src/store/schemas.ts` удалён; `schema.test.ts` собирает карту из
      реестра; `registry.test.ts` обновлён.
- [x] `sectionOf` удалён.
- [x] `radioOptionsOf(fieldName, dataBase)` без `state`; 3 компонента и тест
      обновлены.
- [x] `import React` удалён из ___ файлов; `DiagnozManager` использует
      `ChangeEvent`; `varsIgnorePattern` убран.
- [x] Ре-экспорты экшенов удалены, 10 импортов переведены на `fieldActions`.
- [ ] `npm test`: ___ тестов (не меньше 230); сборка: ___ модулей.
- [ ] `typecheck` / `lint` / `build` — зелёные; `dist/` собирается.
- [x] Статус этапа обновлён в `specs/README.md`.

