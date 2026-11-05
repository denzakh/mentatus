# Этап 16 — Тестовая инфраструктура и покрытие

**Статус:** ⬜ не выполнено.
**Зависимости:** этапы 11–15 (пороги покрытия считаются по итоговому коду).
**Приоритет:** P3, выполняется последним.
**Цель:** ускорить прогон тестов, измерять покрытие и не давать ему падать
в CI — без изменения продового кода.

## Как выполнять (агенту)

1. Прочитать целиком: этот файл, `vite.config.js`, `package.json`,
   `.github/workflows/ci.yml`, `src/setupTests.ts`, `.gitignore`.
2. Выполнять шаги 16.1 → 16.4 по порядку, замеряя время прогона.
3. Один этап = один коммит. Продовый код (`src/components`, `src/lib`,
   `src/store`, `src/reducers`) не меняется.
4. Заполнить «Итог выполнения» и обновить статус в `specs/README.md`.

## Контекст

- `npm test` = `vitest run`: **32 файла / 231 тест**. Время зависит от кэша
  esbuild/vite: **~24.8 с** на холодную и **~4.4 с** при повторном прогоне
  (замеры на baseline `597b517`).
- Vitest сам подсказывает проблему:
  `Environment jsdom was created 32 times · 37.86–277.85s total, 78–80% of
  tracked time` → `pool: 'vmThreads'` (или `isolate: false`).
- Конфиг тестов лежит в `vite.config.js` (секция `test`): `environment: "jsdom"`,
  `globals: true`, `setupFiles: ["./src/setupTests.ts"]`,
  `include: ["src/**/*.test.{js,jsx,ts,tsx}"]`.
- `@vitest/coverage-v8` не установлен, скрипта `test:coverage` нет.
- CI (`.github/workflows/ci.yml`) запускает `typecheck → lint → test → build`;
  покрытие не измеряется и не сохраняется.
- `/coverage` уже в `.gitignore`.

## Шаги

### 16.1. Ускорение прогона

`vite.config.js`, секция `test`:

```js
test: {
  environment: "jsdom",
  globals: true,
  setupFiles: ["./src/setupTests.ts"],
  include: ["src/**/*.test.{js,jsx,ts,tsx}"],
  // jsdom-окружение создаётся на воркер, а не на каждый файл
  pool: "vmThreads"
}
```

Замер: `npm test` до и после — дважды (сразу после правки и повторно), оба
времени записать в «Итог выполнения». Ожидание: предупреждение про
`Environment jsdom was created N times` исчезло, холодный прогон не медленнее
~24.8 с, повторный — не медленнее ~4.4 с, число тестов не изменилось.

Если после переключения упадут тесты, работающие с глобальным состоянием
(`src/index.test.tsx` пишет в `document.body`, `src/store/persist.test.ts`
и `src/components/*.test.tsx` используют `localStorage`), добавить в эти файлы
локальную очистку в `beforeEach`:

```ts
beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = "";
});
```

Тесты править можно, **продовый код — нет**.

### 16.2. Покрытие

```bash
npm i -D @vitest/coverage-v8
```

`vite.config.js`, рядом с `test` (внутри `test`):

```js
coverage: {
  provider: "v8",
  reporter: ["text", "html"],
  include: ["src/**/*.{ts,tsx}"],
  exclude: [
    "src/**/*.test.{ts,tsx}",
    "src/testUtils/**",
    "src/setupTests.ts",
    "src/vite-env.d.ts"
  ]
}
```

`package.json`:

```json
"test:coverage": "vitest run --coverage"
```

Запустить `npm run test:coverage`, зафиксировать в «Итоге» фактические
`lines / statements / functions / branches`. Каталог `coverage/` не коммитится
(уже в `.gitignore`).

### 16.3. Пороги

Порог ставится от **фактического** значения, чтобы CI не «краснел» на первом
же прогоне: `порог = floor(факт) − 3` (для `branches` — `− 5`), но не ниже 60.
Пример для факта `lines: 84.6`, `functions: 79.2`, `branches: 71.8`,
`statements: 84.6`:

```js
thresholds: {
  lines: 81,
  statements: 81,
  functions: 76,
  branches: 66
}
```

Числа не выдумывать: брать из своего прогона и записывать в «Итог».
Пороги живут в `vite.config.js` и проверяются только при `test:coverage`.

### 16.4. CI

`.github/workflows/ci.yml` — заменить шаг `npm test` на прогон с покрытием
и сохранить отчёт артефактом:

```yaml
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: coverage
          path: coverage
```

Порядок шагов и версии `actions/*` не менять. `npm test` отдельным шагом
не нужен: `test:coverage` запускает те же тесты.

### 16.5. Что остаётся за рамками

E2E (Playwright/Cypress) и визуальные снимки — отдельная спека: сейчас их нет,
установка браузеров в CI заметно удорожает пайплайн. В этом этапе ничего
подобного **не добавлять**.

## Критерии приёмки

- `npm test` быстрее или равен baseline в обоих режимах (холодный ~24.8 с,
  повторный ~4.4 с), тестов не меньше 231, все зелёные.
- Предупреждение Vitest про многократное создание jsdom исчезло.
- `npm run test:coverage` создаёт `coverage/` и печатает таблицу покрытия;
  пороги из 16.3 проходят.
- `@vitest/coverage-v8` добавлен только в `devDependencies`;
  runtime-зависимости не изменились.
- CI обновлён: typecheck → lint → test:coverage → build + артефакт `coverage`.
- `git status` не содержит `coverage/` (игнорируется).

## Проверка

```bash
npm test
npm run test:coverage
npm run typecheck
npm run lint
npm run build
git status --short
```

Ожидание: `coverage/` в `git status` не появляется; сборка и линт без изменений.

## Риски

- **`isolate: false` не использовать**: он делит jsdom между файлами, а в
  проекте есть тесты, меняющие `document.body` и `localStorage`; выигрыш
  во времени не стоит «плавающих» падений.
- **Покрытие v8 занижает ветки** (особенно тернарники в `lib/text`) — пороги
  не задирать, иначе CI начнёт падать на косметических правках.
- **`coverage` в `npm test` не включать**: локальный прогон должен оставаться
  быстрым, покрытие — отдельной командой.
- **Пороги не поднимать вручную** без нового прогона: они фиксируют текущий
  уровень, а не цель.
- **Тесты можно править только для изоляции состояния** (16.1); ослаблять
  проверки нельзя.

## Границы этапа

- Не менять продовый код и схемы.
- Не удалять и не переписывать существующие тесты (кроме `beforeEach`-очистки).
- Не добавлять e2e и визуальные тесты.
- Не менять `npm test` (он остаётся однократным прогоном без покрытия).

## Итог выполнения

- [ ] `vite.config.js`: `pool: "vmThreads"`; время прогона: холодный было ___ с /
      стало ___ с, повторный было ___ с / стало ___ с; тестов ___.
- [ ] `@vitest/coverage-v8` установлен (dev), добавлен `test:coverage`.
- [ ] Фактическое покрытие: lines ___, statements ___, functions ___,
      branches ___; пороги: ___.
- [ ] CI обновлён (шаг `test:coverage` + артефакт `coverage`).
- [ ] `typecheck` / `lint` / `build` — зелёные; `coverage/` не в git.
- [ ] Статус этапа обновлён в `specs/README.md`.

