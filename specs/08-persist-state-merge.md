# Этап 11 — Рехидратация persist: новые поля среза

**Статус:** ⬜ не выполнено.
**Зависимости:** этапы 1–10 (baseline `597b517`).
**Приоритет:** P1. Пока этап не выполнен, любое добавление поля в `*Store.ts`
ломает форму у пользователя, у которого в `localStorage` уже есть снапшот.
**Цель:** сохранённое состояние должно накладываться на актуальную схему поля,
а не заменять срез целиком.

## Как выполнять (агенту)

1. Прочитать целиком: этот файл, `src/store/persist.ts`,
   `src/reducers/createSectionSlice.ts`, `src/store/persist.test.ts`,
   `src/reducers/sections.ts`, `specs/README.md` (§ «Общие соглашения»).
2. Выполнять шаги по порядку; после каждого шага прогонять
   `npx vitest run src/store/persist.test.ts`.
3. Один этап = один коммит. Тексты заключения, разметка, CSS и схемы
   не меняются.
4. Заполнить «Итог выполнения» в конце файла и обновить статус этапа
   в `specs/README.md`.
5. Если проверка не проходит и исправление выходит за «Границы этапа» —
   остановиться и описать блокер в «Итоге выполнения».

## Контекст

- Персист: `src/store/persist.ts:23-34`. Ключ `persist:mentatus`,
  `version: 2`, `whitelist: Object.keys(sections)`, `throttle: 300`,
  `migrate: undefined`, **`stateReconciler` не задан**.
- Срез = раздел (`zhaloby`, `anamnez`, `sostoyanie`, `affekt`, `rech`,
  `kognit`, `pp`, `diagnoz`), поле = ключ внутри среза
  (`src/reducers/sections.ts`). Начальные значения — `src/store/*Store.ts`,
  описания — `src/store/*Data.ts`.
- Поле имеет одну из трёх форм: `{ isChecked }` | `{ number }` | `{ text }`
  (`src/types/status.ts`).
- Редьюсер среза обрабатывает экшен, только если поле уже есть в срезе
  (`src/reducers/createSectionSlice.ts:35-52`):

```ts
.addCase(setSymptom, (state, action) => {
  const field = state[action.payload.name] as MutableField | undefined;
  if (field && field.isChecked !== undefined) {
    field.isChecked = !field.isChecked;
  }
})
```

Без `stateReconciler` redux-persist 6 использует `autoMergeLevel1`, который
для каждого ключа снапшота делает `newState[key] = inboundState[key]`.
Ключ верхнего уровня — это срез, поэтому **срез заменяется целиком**: поля,
добавленные в `*Store.ts` после того, как пользователь что-то отметил,
исчезают из стора.

## Проблема

1. Пользователь открывает приложение и отмечает, например, «Общее состояние»
   → срез `sostoyanie` уходит в `localStorage`.
2. Разработчик добавляет поле в `src/store/sostoyanieStore.ts` (+ `*Data.ts`
   + `*Layout.ts`) и выпускает версию.
3. У пользователя после перезагрузки нового поля в сторе **нет**: чекбокс
   выглядит снятым, клик по нему ничего не делает, ошибок в консоли нет
   (guard в `createSectionSlice` молча игнорирует экшен).

Проверено на установленном `redux-persist@6.0.0` (одноразовая проба,
в репозиторий её добавлять не нужно):

```
стартовый срез: { x: {isChecked:false}, newField: {isChecked:false} }
снапшот:        { x: {isChecked:true} }            (срез без newField)

autoMergeLevel1 (по умолчанию) → { x: {isChecked:true} }              ← newField потерян
autoMergeLevel2                → { x: {...}, newField: {isChecked:false} } ← поле сохранено
```

## Шаги

### 11.1. Тест-репродукция (сначала красный)

В `src/store/persist.test.ts`, **внутри** `describe("persistStore")` (там уже
есть хелперы `createMemoryStorage`, `createPersistedStore`, `rehydrate`),
добавить тест:

```ts
it("дополняет сохранённый срез полями из *Store.ts", async () => {
  const storage = createMemoryStorage();

  // «старый» снапшот: срез есть, но в нём только одно поле
  storage.data[storageKey] = JSON.stringify({
    sostoyanie: JSON.stringify({ pol: { isChecked: true } })
  });

  const store = createPersistedStore(storage);
  await rehydrate(store);

  // новые поля среза на месте и имеют стартовые значения
  expect(store.getState().sostoyanie.dataOsmotra).toBeDefined();
  expect(store.getState().sostoyanie.sIstorieiOznakomlen.isChecked).toBe(false);
  // сохранённое значение не потеряно
  expect(store.getState().sostoyanie.pol.isChecked).toBe(true);

  // и экшены по новому полю работают (до фикса здесь тихий no-op)
  store.dispatch(setSymptom("sIstorieiOznakomlen"));
  expect(store.getState().sostoyanie.sIstorieiOznakomlen.isChecked).toBe(true);
});
```

Запустить `npx vitest run src/store/persist.test.ts` — тест должен упасть
(на первом же `expect`). Вывод падения сохранить для «Итога выполнения».

### 11.2. Реконсилятор с проверкой формы поля

Создать `src/store/stateReconciler.ts`:

```ts
import type { StateReconciler } from "redux-persist";
import type { RootState } from "../reducers";
import type { FieldValue, SectionName, StatusSection } from "../types/status";

/*
Слияние сохранённого состояния со стартовым.

redux-persist по умолчанию (autoMergeLevel1) заменяет срез целиком, поэтому
поле, добавленное в *Store.ts после первого сохранения, у вернувшегося
пользователя исчезает, а `createSectionSlice` молча игнорирует экшены для
такого поля. Здесь сохранённые значения накладываются на стартовые по полям:
незнакомые поля отбрасываются, значение принимается только при совпадении
формы `{ isChecked }` | `{ number }` | `{ text }`.
*/

// единственный ключ формы поля
function formOf(value: unknown): string | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const keys = Object.keys(value);
  return keys.length === 1 ? keys[0] : undefined;
}

// сохранённое значение подходит, только если форма поля не изменилась
export function hasSameForm(saved: unknown, initial: FieldValue): boolean {
  return formOf(saved) !== undefined && formOf(saved) === formOf(initial);
}

// срез: сохранённые значения поверх стартовых, незнакомые поля отбрасываются
export function mergeSectionState(
  inbound: unknown,
  initial: StatusSection
): StatusSection {
  const saved = (inbound || {}) as Record<string, unknown>;
  const merged: StatusSection = { ...initial };

  Object.keys(initial).forEach(field => {
    if (hasSameForm(saved[field], initial[field])) {
      merged[field] = saved[field] as FieldValue;
    }
  });

  return merged;
}

export const mergeSections: StateReconciler<RootState> = (
  inboundState,
  state,
  reducedState
) => {
  // state не нужен: слияние идёт от reducedState (стартовые значения полей)
  void state;

  const saved = (inboundState || {}) as Record<string, unknown>;
  const merged = {} as RootState;

  (Object.keys(reducedState) as SectionName[]).forEach(section => {
    merged[section] = mergeSectionState(saved[section], reducedState[section]);
  });

  return merged;
};
```

Требования к коду:

- тип `StateReconciler` экспортируется пакетом `redux-persist` (проверено
  на 6.0.0) — импорт только типа, новых зависимостей нет;
- `void state` — осознанный приём, уже используется в `src/lib/redux/index.ts`
  (`radioOptionsOf`), чтобы линт не ругался на неиспользуемый параметр;
- функция чистая: не читает `localStorage` и не знает про React.

### 11.3. Подключение

`src/store/persist.ts` — добавить импорт и одну строку в конфиг:

```ts
import { mergeSections } from "./stateReconciler";
```

```ts
export const persistConfig = {
  key: PERSIST_KEY,
  version: PERSIST_VERSION,
  storage,
  // сохраняем только предметные срезы разделов
  whitelist: Object.keys(sections),
  // без throttle состояние сериализуется в localStorage на каждый экшен,
  // то есть на каждый символ при вводе в поле
  throttle: 300,
  // сохранённые значения накладываются на поля актуальной схемы: поле,
  // добавленное в *Store.ts, не пропадает у вернувшегося пользователя
  stateReconciler: mergeSections,
  // при несовместимом изменении формы состояния поднять version и добавить migrate
  migrate: undefined
};
```

Ничего больше в `persistConfig` не меняется: `key`, `version`, `whitelist`
и `throttle` остаются прежними.

### 11.4. Unit-тесты реконсилятора

Создать `src/store/stateReconciler.test.ts`. Набор случаев обязателен:

```ts
import rootReducer from "../reducers";
import { hasSameForm, mergeSectionState, mergeSections } from "./stateReconciler";
import type { StatusSection } from "../types/status";

const initial: StatusSection = {
  flag: { isChecked: false },
  num: { number: 0 },
  str: { text: "" }
};

describe("hasSameForm", () => {
  it("совпадает для той же формы поля", () => {
    expect(hasSameForm({ isChecked: true }, initial.flag)).toBe(true);
  });

  it("не совпадает при смене формы поля", () => {
    expect(hasSameForm({ text: "x" }, initial.flag)).toBe(false);
  });

  it("не совпадает для мусора", () => {
    expect(hasSameForm(null, initial.flag)).toBe(false);
    expect(hasSameForm({}, initial.flag)).toBe(false);
    expect(hasSameForm({ a: 1, b: 2 }, initial.flag)).toBe(false);
    expect(hasSameForm("x", initial.flag)).toBe(false);
  });
});

describe("mergeSectionState", () => {
  it("накладывает сохранённые значения по полям", () => {
    const merged = mergeSectionState({ flag: { isChecked: true } }, initial);

    expect(merged.flag.isChecked).toBe(true);
  });

  it("оставляет стартовые значения у новых полей", () => {
    const merged = mergeSectionState({ flag: { isChecked: true } }, initial);

    expect(merged.num).toEqual({ number: 0 });
    expect(merged.str).toEqual({ text: "" });
  });

  it("отбрасывает поля, которых больше нет в срезе", () => {
    const merged = mergeSectionState({ removed: { text: "x" } }, initial);

    expect(Object.keys(merged).sort()).toEqual(["flag", "num", "str"]);
  });

  it("отбрасывает значение, если форма поля изменилась", () => {
    const merged = mergeSectionState({ num: { text: "x" } }, initial);

    expect(merged.num).toEqual({ number: 0 });
  });

  it("возвращает стартовые значения при пустом снапшоте", () => {
    expect(mergeSectionState(undefined, initial)).toEqual(initial);
    expect(mergeSectionState(null, initial)).toEqual(initial);
  });

  it("не мутирует исходный срез", () => {
    mergeSectionState({ flag: { isChecked: true } }, initial);

    expect(initial.flag.isChecked).toBe(false);
  });
});

describe("mergeSections", () => {
  const state = rootReducer(undefined, { type: "@@INIT" });

  it("сливает каждый срез и не добавляет незнакомые разделы", () => {
    const merged = mergeSections(
      { sostoyanie: { pol: { isChecked: true } }, unknown: { x: 1 } },
      state,
      state
    );

    expect(merged.sostoyanie.pol.isChecked).toBe(true);
    expect(Object.keys(merged).sort()).toEqual(Object.keys(state).sort());
  });
});
```

Итого ≥ 10 новых тестов на реконсилятор (в отчёте указать фактическое число).

### 11.5. Правила работы с persist (документация)

Добавить комментарий в `src/store/persist.ts` (над `persistConfig`) и
дополнить раздел «Работа с persist» в `specs/README.md` (таблица уже внесена,
нужно указать, что слияние выполняет `src/store/stateReconciler.ts`):

| Изменение в `src/store` | Что делать |
|---|---|
| добавлено поле в `*Store.ts` | ничего: реконсилятор дополнит срез стартовым значением |
| удалено поле | ничего: значение из снапшота будет отброшено при рехидратации |
| поле переименовано / сменило форму (`isChecked` ↔ `number` ↔ `text`) | поднять `PERSIST_VERSION` на 1 и описать потерю значения в PR; при необходимости добавить `migrate` |
| добавлен/удалён срез | `whitelist` выводится из `sections`, менять вручную не нужно |

Без этого правила следующий рефакторинг снова «тихо» сломает форму: значение
изменившейся формы отбрасывается, но переименованное поле теряет данные
пользователя.

## Критерии приёмки

- Тест из 11.1 зелёный; в «Итоге выполнения» приведены выводы «до» (красный)
  и «после» (зелёный).
- `git diff src/store/persist.ts` содержит только импорт, комментарий
  и строку `stateReconciler`; `key`, `version`, `whitelist`, `throttle`
  не изменились.
- `src/reducers/createSectionSlice.ts` не изменён.
- Существующий тест `src/reducers/sections.test.ts` («игнорирует экшены для
  чужих полей и других разделов») остаётся зелёным.
- Новых тестов ≥ 10 (`stateReconciler.test.ts`) + 1 интеграционный.
- `npm run typecheck`, `npm test`, `npm run lint`, `npm run build` — зелёные.

## Проверка

```bash
npm run typecheck
npx vitest run src/store/persist.test.ts src/store/stateReconciler.test.ts
npm test
npm run lint
npm run build
```

Ручная проверка (обязательна):

1. `npm run dev`, отметить пару полей в «Общем состоянии».
2. DevTools → Application → Local Storage → `persist:mentatus`: в JSON среза
   `sostoyanie` удалить одно поле вручную, сохранить.
3. Перезагрузить страницу: удалённое поле вернулось со стартовым значением,
   остальные значения сохранились, заключение собирается как раньше.

## Риски

- **Нельзя создавать поле по экшену** в `createSectionSlice`: экшены
  бродкастятся во все 8 срезов, и `SET_SYMPTOM` с неизвестным именем создал бы
  мусорное поле в каждом срезе.
- **Не заменять реконсилятор на `autoMergeLevel2`** без обсуждения: он
  сохраняет новые поля, но оставляет в сторе удалённые и не проверяет форму
  значения.
- **Переименование поля теряет данные** — это ожидаемо; предупредить в PR.
- **`debug: true` в persistConfig не включать** — шумит в консоли и в тестах.
- **`throttle` не трогать**: без него запись идёт на каждый символ.

## Границы этапа

- Не менять форму поля, схемы `*Data.ts`, `*Layout.ts`, компоненты и тексты.
- Не менять ключ `persist:mentatus` и `PERSIST_VERSION` (остаётся 2).
- Не добавлять зависимости и не менять `clearLegacyState`.
- Не переписывать `src/store/persist.test.ts` целиком — только добавить тест.

## Итог выполнения

Заполняет агент, выполнивший этап:

- [ ] `src/store/stateReconciler.ts` создан, покрыт тестами (число: ___).
- [ ] `src/store/persist.ts`: добавлен `stateReconciler`, остальной конфиг без
      изменений.
- [ ] Тест 11.1: до фикса — красный (вывод приложен), после — зелёный.
- [ ] `npm run typecheck` / `npm test` / `npm run lint` / `npm run build` —
      результаты: ___ тестов, ___ модулей в сборке.
- [ ] Ручная проверка с правкой `localStorage` выполнена.
- [ ] Статус этапа обновлён в `specs/README.md`.



