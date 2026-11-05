# Этап 15 — Доступность, устойчивость и данные пользователя

**Статус:** ⬜ не выполнено.
**Зависимости:** этап 12 (строгие типы компонентов), этап 11 (сброс формы
опирается на рабочий persist).
**Приоритет:** P3. Не влияет на бизнес-логику, но закрывает a11y-долг,
падение всего приложения при ошибке и отсутствие способа очистить данные
пациента.
**Цель:** навигация с клавиатуры, изолированный сбой рендера и безопасный
сброс формы — без изменения внешнего вида и текстов заключения.

## Как выполнять (агенту)

1. Прочитать целиком: этот файл, `src/components/TabMenu/index.tsx`,
   `src/containers/App/index.tsx`, `src/components/ConclusionPanel/index.tsx`,
   `src/reducers/createSectionSlice.ts`, `src/types/components.ts`,
   `src/index.tsx`, `index.html`, `src/index.css`.
2. Выполнять шаги 15.1 → 15.6 по порядку; после каждого — `npm run typecheck`
   и целевые тесты.
3. Один этап = один коммит. Тексты заключения, схемы, layout и порядок разделов
   не меняются.
4. Заполнить «Итог выполнения» и обновить статус в `specs/README.md`.

## Контекст

- Меню разделов — `<div onClick={toggleTab}>` (`TabMenu/index.tsx:33-45`):
  вкладка не фокусируется, Enter/Space не работают, скринридер не сообщает
  о кнопке.
- Переход в раздел из заключения — `<span data-id onClick>` (в `DiagnozList`
  — `<div>`) в 10 файлах, всего 12 узлов: `AffektList`, `AnamnezList`,
  `DiagnozList`, `KognitList`, `KritikaList`, `OrientirovkaList`, `PpList`
  (3 узла), `RechList`, `SostoyanieList`, `ZhalobyList`.
- `ErrorBoundary` нет: исключение в любом `*List`/`*Manager` размонтирует всё
  дерево (React 18 очищает root), пользователь видит пустую страницу.
- Сброса формы нет: медицинские данные после пациента остаются в
  `persist:mentatus` бессрочно и в открытом виде.
- `index.html:10-11` — абсолютные `/manifest.json`, `/favicon.ico` при
  `base: "./"` в `vite.config.js`.
- Футер: `Copyright 2021 Denis Zakharchenko` зашит в
  `containers/App/index.tsx:44`.

## Шаги

### 15.1. Меню разделов — настоящие кнопки

`src/components/TabMenu/index.tsx`: заменить `<div>` на `<button>`.
Классы, `data-id`, `title`, `key` и вложенная разметка
(`app__tab-symbol` / `app__tab-label`) не меняются:

```tsx
<button
  type="button"
  onClick={toggleTab}
  title={tab.title}
  key={name}
  data-id={name}
  className={tabClass}
  aria-current={name === activeTab ? "page" : undefined}
>
  <div className="app__tab-symbol">{tab.symbol}</div>
  <div className="app__tab-label">{tab.title}</div>
</button>
```

`src/components/TabMenu/TabMenu.css`: к существующему `.tab-menu__item`
добавить сброс стилей кнопки (внешний вид не должен измениться):

```css
.tab-menu__item {
  /* кнопка иначе берёт системный шрифт и свойство text-align */
  font: inherit;
  color: inherit;
  text-align: inherit;
}
```

Проверить визуально: размеры (`min-width: 80px`, `max-width: 105px`),
скругление, фон и активное состояние совпадают с прежними.

Тест в `src/containers/App/App.test.tsx` — пункт меню является кнопкой,
у активной выставлен `aria-current`:

```ts
it("пункты меню — кнопки с aria-current у активной вкладки", () => {
  const store = createStatusStore();
  const { container } = renderWithStatus(<App />, store);

  const tab = container.querySelector(
    '.tab-menu [data-id="zhaloby"]'
  ) as HTMLElement;

  expect(tab.tagName).toBe("BUTTON");
  expect(tab.getAttribute("type")).toBe("button");
  expect(
    container
      .querySelector('.tab-menu [data-id="sostoyanie"]')
      ?.getAttribute("aria-current")
  ).toBe("page");
});
```

### 15.2. Переход в раздел из заключения

1. `src/types/components.ts` — обработчик не должен требовать именно
   `MouseEvent`, чтобы его можно было вызвать из `onKeyDown`:

```ts
// цель клика/нажатия: нужен только data-id узла
export interface ToggleTabTarget {
  currentTarget: Element;
}

export type ToggleTabHandler = (event: ToggleTabTarget) => void;
```

`App` при этом не меняется: `e.currentTarget.getAttribute("data-id")` работает
и для мыши, и для клавиатуры.

2. Новый компонент `src/components/SectionLink/index.tsx`:

```tsx
import type { KeyboardEvent, ReactNode } from "react";
import type { SectionName } from "../../types/status";
import type { ToggleTabHandler } from "../../types/components";

/*
SectionLink
обёртка узла заключения: клик и Enter/Space открывают раздел

Разметка остаётся прежней (<span> или <div> с data-id), добавляются только
role/tabIndex и обработка клавиатуры — поэтому внешний вид не меняется.
*/

interface Props {
  section: SectionName;
  onToggle?: ToggleTabHandler;
  className?: string;
  as?: "span" | "div";
  children: ReactNode;
}

export default function SectionLink(props: Props) {
  const { section, onToggle, className, as = "span", children } = props;

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (onToggle) {
        onToggle(event);
      }
    }
  };

  const common = {
    className,
    "data-id": section,
    role: "button",
    tabIndex: 0,
    onClick: onToggle,
    onKeyDown: handleKeyDown
  } as const;

  if (as === "div") {
    return <div {...common}>{children}</div>;
  }

  return <span {...common}>{children}</span>;
}
```

3. Заменить обёртки в 10 файлах, сохранив `className` и `data-id`:
   `<span data-id="rech" onClick={props.toggleTab}>` →
   `<SectionLink section="rech" onToggle={props.toggleTab}>`.
   В `DiagnozList` передать `as="div"` (там обёртка была `<div>`),
   в `ZhalobyList` — `className="list__section"`.
   В `PpList` три узла: `pp`, `affekt`, `pp`.
   `import React` новым файлам не нужен: JSX-рантайм автоматический
   (`jsx: "react-jsx"`).

4. `src/index.css` — видимый фокус (единственное визуальное изменение):

```css
[data-id][role="button"]:focus-visible,
.tab-menu__item:focus-visible {
  outline: 2px dashed #666666;
  outline-offset: 2px;
}
```

5. Тест в `App.test.tsx` — Enter на узле заключения переключает раздел:

```ts
it("переключает раздел с клавиатуры", () => {
  const store = createStatusStore();
  const { container } = renderWithStatus(<App />, store);

  const node = container.querySelector(
    '.conclusion__text [data-id="zhaloby"]'
  ) as HTMLElement;

  expect(node.getAttribute("role")).toBe("button");
  expect(node.tabIndex).toBe(0);

  fireEvent.keyDown(node, { key: "Enter" });

  expect(container.querySelector('[data-id="zhaloby"].is-active')).not.toBe(
    null
  );
});
```

### 15.3. Изоляция сбоя рендера

Новый `src/components/ErrorBoundary/index.tsx` — классовый компонент,
единственный допустимый случай (`componentDidCatch` хуками не заменить):

```tsx
import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/*
ErrorBoundary
не даёт ошибке в разделе или заключении очистить всё приложение

Данные пациента лежат в localStorage, поэтому после перезагрузки форма
восстанавливается; пользователю остаётся нажать «Перезагрузить».
*/

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Ошибка рендеринга:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <p>Не удалось отобразить статус. Введённые данные сохранены.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Перезагрузить
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

Подключить в `src/index.tsx` внутри `PersistGate` и **внутри** каркаса,
чтобы сбой раздела не убивал меню: обернуть `<ActivePage />`:

```tsx
<div className="wrapper__main">
  <ErrorBoundary>
    <ActivePage />
  </ErrorBoundary>
</div>
```

Стили — `src/index.css`: `.error-boundary { padding: 24px; }`.

Тест `src/components/ErrorBoundary/ErrorBoundary.test.tsx`:

```tsx
function Bomb(): JSX.Element {
  throw new Error("boom");
}

it("показывает фолбэк вместо упавшего дерева", () => {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});

  render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );

  expect(screen.getByText(/Не удалось отобразить статус/)).toBeInTheDocument();
  spy.mockRestore();
});

it("рендерит детей, если ошибки нет", () => {
  render(
    <ErrorBoundary>
      <span>ok</span>
    </ErrorBoundary>
  );

  expect(screen.getByText("ok")).toBeInTheDocument();
});
```

Импорты теста: `render`, `screen` из `@testing-library/react`, `vi` — глобальный
(`vitest/globals` в `tsconfig`).

### 15.4. Сброс формы («Новый пациент»)

1. `src/actions/resetAction.ts`:

```ts
import { createAction } from "@reduxjs/toolkit";

/*
Полный сброс формы: каждый срез возвращается к начальным значениям
(*Store.ts). Используется кнопкой «Очистить» в ConclusionPanel.
*/
export const resetState = createAction("RESET_STATE");
```

2. `src/reducers/createSectionSlice.ts` — обработка сброса:

```ts
import { resetState } from "../actions/resetAction";

// в builder.extraReducers, последней цепочкой:
.addCase(resetState, () => initialState)
```

3. `src/components/ConclusionPanel/index.tsx` — кнопка и подтверждение
   (третья кнопка в существующем `.conclusion-panel__row`):

```tsx
import { resetState } from "../../actions/resetAction";
import { useAppDispatch } from "../../lib/redux";

const dispatch = useAppDispatch();

const resetForm = () => {
  if (window.confirm("Очистить все поля? Данные не сохранятся.")) {
    dispatch(resetState());
  }
};
```

```tsx
<button type="button" className="conclusion-panel__btn" onClick={resetForm}>
  Очистить
</button>
```

4. Persist писать не нужно: после `RESET_STATE` стор содержит начальные
   значения, и `persistor` сам перезапишет `persist:mentatus` (throttle 300).

5. Тесты:

- `src/reducers/sections.test.ts` — «возвращает срез к начальному состоянию»:

```ts
it("сбрасывает срез к начальному состоянию", () => {
  const state = reducer(undefined, setSymptom("flag"));
  expect(state.flag.isChecked).toBe(true);

  const reset = reducer(state, resetState());
  expect(reset).toEqual(reducer(undefined, { type: "@@INIT" }));
});
```

- новый `src/components/ConclusionPanel/ConclusionPanel.test.tsx`:
  подтверждение вызывает сброс, отказ — нет (стор из
  `src/testUtils/statusStore`, `vi.spyOn(window, "confirm")`).

### 15.5. Относительные пути к ассетам

`index.html`:

```html
<link rel="manifest" href="./manifest.json" />
<link rel="shortcut icon" href="./favicon.ico" />
```

Проверка: `npm run build` → в `dist/index.html` пути начинаются с `./`,
`dist/manifest.json` и `dist/favicon.ico` на месте, `dist/CNAME` сохранён.
После `npm run preview` приложение открывается и с корня, и из подпапки.

### 15.6. Год в футере

`src/containers/App/index.tsx`:

```tsx
Copyright 2021–{new Date().getFullYear()} Denis Zakharchenko
```

Тесты на текст футера не опираются — проверить, что `App.test.tsx` зелёный.

## Критерии приёмки

- В меню 8 кнопок `<button type="button">` с прежними классами и подписями;
  у активной `aria-current="page"`; внешний вид не изменился.
- Все 12 узлов перехода в заключении имеют `role="button"`, `tabIndex={0}`,
  Enter/Space переключают раздел (тест в `App.test.tsx`).
- `ErrorBoundary` подключён в `index.tsx`; тест на фолбэк зелёный;
  при ошибке в разделе меню и заключение остаются на экране.
- Кнопка «Очистить»: с подтверждением — все 8 срезов равны начальным
  значениям и после перезагрузки форма пустая; без подтверждения — состояние
  не меняется.
- `dist/index.html` использует `./manifest.json` и `./favicon.ico`.
- Все проверки зелёные; тексты заключения, схемы и layout не изменились.

## Проверка

```bash
npm run typecheck
npm test
npm run lint
npm run build
```

Ручная проверка:

1. Tab по меню — фокус виден, Enter открывает раздел.
2. Tab до заключения, Enter на абзаце — открывается соответствующий раздел.
3. Временно бросить `throw new Error("test")` в `SostoyanieList` — вместо
   пустой страницы появляется фолбэк, меню на месте; убрать правку.
4. «Очистить» → отмена: поля на месте. «Очистить» → ОК: поля пустые, после
   перезагрузки тоже пустые.
5. `npm run preview` — манифест и favicon загружаются, консоль без 404.

## Риски

- **`<button>` приносит свои стили** (шрифт, `text-align`, рамка): без сброса
  из 15.1 меню визуально «поедет».
- **`SectionLink` меняет только атрибуты**, но `DiagnozList` был `<div>` —
  обязательно `as="div"`, иначе изменится поток блока.
- **`role="button"` на `<span>`** внутри `<p>` валиден, но не превращайте
  обёртку в `<button>`: кнопка внутри `<p>` ломает текущую вёрстку заключения.
- **`window.confirm` не реализован в jsdom** — в тестах обязателен
  `vi.spyOn(window, "confirm")`.
- **Сброс не должен трогать `persist:mentatus` напрямую**: `PURGE` очистит
  ключ, но состояние останется в памяти — источником правды остаётся стор.
- **Не менять текст футера по смыслу** (лицензия Apache 2.0).

## Границы этапа

- Не менять тексты заключения, схемы, layout и порядок разделов.
- Не добавлять роутер, экспорт/импорт JSON и выбор пациента — отдельные задачи.
- Не менять CSS, кроме сброса стилей кнопки меню, `:focus-visible`
  и `.error-boundary`.
- Не трогать `persist.ts`/`stateReconciler.ts` (этап 11) и `scripts/*` (этап 13).

## Итог выполнения

- [ ] `TabMenu` — кнопки, `aria-current`, стили кнопки сброшены; тест добавлен.
- [ ] `SectionLink` создан; 12 узлов в 10 файлах переведены; `ToggleTabHandler`
      расширен; Enter/Space работают (тест).
- [ ] `ErrorBoundary` создан и подключён; 2 теста зелёные.
- [ ] `resetState` + кнопка «Очистить» + подтверждение; тесты редьюсера и
      панели зелёные.
- [ ] `index.html` — относительные пути; проверено на `dist/`.
- [ ] Год в футере обновлён.
- [ ] `typecheck` / `test` / `lint` / `build`: ___ тестов, ___ модулей.
- [ ] Ручной чек-лист (Tab/Enter, фолбэк, сброс, preview) выполнен.
- [ ] Статус этапа обновлён в `specs/README.md`.


