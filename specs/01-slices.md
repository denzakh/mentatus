# Этап 1 — Разбиение среза `psystatus` на срезы по разделам

**Статус:** ✅ выполнено.
**Зависимости:** нет.
**Назначение:** этот файл — зафиксированный baseline; повторно выполнять не нужно.

## Цель

Убрать монолитный срез `psystatus` (~181 поле) и разложить поля по срезам разделов,
чтобы следующие этапы (схемный рендеринг, persist, RTK, TS) работали с независимыми
частями состояния.

## Что было до

- `src/reducers/index.jsx`: `combineReducers({ option, psystatus })`.
- `src/reducers/psystatusInitialState.jsx`: спред 10 `store/*Store.js` в один объект.
- `src/reducers/psystatus.jsx`: один редьюсер на `SET_SYMPTOM`/`SET_TEXT`/`SET_RADIO`.
- Компоненты читали `state.psystatus[name]`.

## Что сделано

- `src/reducers/sections.js` — карта `раздел → initialState` для 8 живых разделов
  (`zhaloby`, `anamnez`, `sostoyanie`, `affekt`, `rech`, `kognit`, `pp`, `diagnoz`) +
  выведенный из неё индекс `fieldSections` (`поле → раздел`).
- `src/reducers/createSectionReducer.js` — фабрика редьюсера раздела с guard:
  обрабатывает только поля своего раздела (`isChecked`/`text`/`number`), чужие экшены
  игнорирует.
- `src/reducers/index.jsx` — `combineReducers({ option, ...sectionReducers })`.
- `src/lib/redux/index.js` — `sectionOf(name)`, `fieldOf(state, name)`;
  `flagsOf(state, keys)` переведён на срезы.
- 30 компонентов переведены с `state.psystatus[...]` на `fieldOf(...)`.
- `isKritikaEmpty(field)` принимает само поле `kritika` (`src/lib/rules/kritika.js`).
- `src/configureStore.js` — ключ localStorage поднят до `mentatus:v2`.
- Удалены `src/reducers/psystatus.jsx`, `src/reducers/psystatusInitialState.jsx`.
- Мёртвые разделы `rekomendacii`/`lechenie`/`kogtest` исключены из срезов.
- Добавлен тест `src/reducers/sections.test.js`.

## Текущий контракт (важно для следующих этапов)

- Состояние: `state.option`, `state.zhaloby`, `state.anamnez`, `state.sostoyanie`,
  `state.affekt`, `state.rech`, `state.kognit`, `state.pp`, `state.diagnoz`.
- Поле: `state[section][field]`, формы `{isChecked}` | `{number}` | `{text}`.
- Экшены глобальные (не slice-scoped): `SET_SYMPTOM`, `SET_TEXT`, `SET_RADIO`
  (`src/actions/symptomAction`, `textAction`, `radioAction`).
- `fieldOf(state, name)` — единая точка чтения поля по имени (пока).
- `fieldSections` — обратный индекс, выведенный из `sections` (не второй источник правды).

## Осталось закрыть (можно в этом этапе или в этапе 5)

1. Удалить неиспользуемые `src/store/rekomendacii{Store,Data}.js`,
   `src/store/lechenie{Store,Data}.js`, `src/store/kogtest{Store,Data}.js`.
   Компоненты `KogtestManager`/`KogtestList` при этом остаются подключены в
   `TabRender`/`Conclusion` — их трогать не нужно.
2. Исправить латентный баг hot-reload в `src/configureStore.js`:
   `require("./reducers")` → `require("./reducers").default`.
3. (Опционально, после этапа 2) заменить `fieldOf` на прямой доступ
   `state[dataBase[name].section][name]`, когда схемы будут нормализованы.

**Закрыто:** пункты 1–2 выполнены в обслуживании после этапа 6
(см. `specs/README.md`); компоненты `KogtestManager`/`KogtestList` тоже удалены.

## Проверка

```bash
CI=true npx react-scripts test --env=jsdom
npx react-scripts build
npx eslint src --ext .js,.jsx
```

Ожидание: 37 тестов зелёные, сборка `Compiled successfully`, линт без ошибок.

## Границы

- Не менять рендеринг и схемы (это этап 2).
- Не подключать redux-persist/RTK (этапы 3–4).
