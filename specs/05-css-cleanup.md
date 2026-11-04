# Этап 5 — Чистка мёртвых CSS-классов

**Статус:** ✅ выполнено (см. «Итог выполнения» в конце).
**Зависимости:** этап 4 (стабильные build/test).
**Цель:** удалить CSS-правила и классы, которые больше не используются в JSX,
не меняя внешний вид.

## Контекст

- CSS-файлы (23), импортируются из компонентов:
  `src/index.css`, `src/containers/App/App.css`, `src/containers/App/Print.css`,
  а также `src/components/*/*.css`: `AffektManager/Affekt.css`,
  `Checkbox/Checkbox.css`, `CheckboxOtkl/CheckboxOtkl.css`, `Conclusion/Conclusion.css`,
  `Conclusion/Print.css`, `ConclusionPanel/ConclusionPanel.css`,
  `DiagnozManager/Diagnoz.css`, `Header/Header.css`, `InputDate/InputDate.css`,
  `KognitManager/Kognit.css`, `OrientirovkaManager/Orientirovka.css`,
  `PpManager/Pp.css`, `RadioList/RadioList.css`, `RadioListInline/RadioListInline.css`,
  `RadioListKogn/RadioListKogn.css`, `RechManager/Rech.css`, `TabMenu/TabMenu.css`,
  `TabRender/TabRender.css`, `Textarea/Textarea.css`, `TextareaInline/TextareaInline.css`.
- Классы задаются:
  - статически: `className="app__row"`;
  - через `classNames({...})` (`src/components/TabMenu/index.jsx`);
  - через шаблоны/условия и пропсы (`itemClassName`, `list__item--no-group`).
- Глобальные классы — `src/index.css` (reset, layout `.wrapper*`).

## Шаги

### 5.1. Отчёт «определено / используется»

Добавить dev-скрипт `scripts/find-unused-css.js`:
1. Пройти `src/**/*.{js,jsx}` и собрать строковые литералы, похожие на классы
   (`/^[a-zA-Z][a-zA-Z0-9_-]*$/` и токены внутри `classNames(...)`).
2. Пройти `src/**/*.css` и собрать все селекторы классов (`.foo`).
3. Вывести `defined - used` и `used - defined`.

Запуск: `node scripts/find-unused-css.js`.
> Отчёт — основа для ручной проверки, не автоудаление (в строках есть ложные срабатывания).

### 5.2. Альтернатива: PurgeCSS в режиме отчёта

```bash
npm i -D purgecss
npx purgecss --css "src/**/*.css" --content "src/**/*.{js,jsx}" --rejected
```

`--rejected` печатает отброшенные селекторы (пути под Windows скорректировать).

### 5.3. Удаление

- Удалять по одному файлу/блоку; после каждого — `npm run build` и визуальная проверка.
- Сначала — явно мёртвые блоки в компонентных CSS, затем глобальные.
- Учитывать динамические классы: `app__tab-symbol`, `app__tab-label`,
  `list__item--no-group`, `manager__col--1`, `no-break`, `break`, `pre`, `is-active`,
  `app__status-box`.
- Print-стили (`Print.css`) проверить через «Печать»/preview.

## Критерии приёмки

- В отчёте не осталось необъяснённых `defined - used`.
- Сборка и тесты зелёные.
- Визуальная проверка (экран + печать) без регрессий.
- Удалённые классы перечислены в описании PR/коммита.

## Проверка

```bash
npm test
npm run build
node scripts/find-unused-css.js
```

## Риски

- **Динамические классы** — не удалять «на глаз», сверять с JS.
- **Каскад/специфичность** — удаление одного правила может изменить вид другого.
- **Print.css** — проверять отдельно.

## Границы этапа

- Не менять разметку и логику; только CSS.
- Не переходить на CSS-модули/препроцессоры (отдельная задача).

## Итог выполнения

- Добавлен dev-скрипт `scripts/find-unused-css.js` (без зависимостей):
  разбирает JS/JSX с учётом комментариев и строк, относит использования к
  «уверенным» (`className=`, `classNames(...)`, `className:` в layout) и
  «прочим строкам», собирает классы из CSS и дополнительно выводит
  пустые правила и дубли классов между файлами.
- Итоговый отчёт: CSS-файлов 18, определено 61 класс,
  `defined - used` — **0**, пустых правил — **0**.
- Удалены неиспользуемые правила: `.app__table`, `.app__td--tab-menu`
  (`containers/App/App.css`).
- Удалены пустые правила: `.list__item:nth-child(4n + 1)` (`App.css`),
  `.conclusion-panel`, `.conclusion-panel__row` (`ConclusionPanel.css`),
  `.diagnoz` (`Diagnoz.css`), `.orientir__bottom` (`Kognit.css` и
  `Orientirovka.css`), `.textarea__label` (`Textarea.css`).
- Удалены мёртвые CSS-файлы: `AffektManager/Affekt.css` (не импортировался;
  дублировал `.orientir__*` из `Kognit.css`/`Orientirovka.css`),
  `Header/Header.css`, `PpManager/Pp.css`, `RechManager/Rech.css`,
  `TabRender/TabRender.css` (пустые). Из `Header`, `PpManager`, `TabRender`
  убраны соответствующие `import "./*.css"`.
- «Используется, но не определено» — это служебные классы-маркеры без стилей
  (`.list__item`, `.break`, `.manager__col--1/2`, `.app__status-box`,
  `.header`, `.tab-render` и т.п.). CSS для них не удалялся: добавление
  стилей изменило бы внешний вид, поэтому оставлено как есть.
- Дубли `.radio__*` (`RadioList.css`/`RadioListKogn.css`) и `.orientir__*`
  (`Kognit.css`/`Orientirovka.css`) сохранены: классы используются, правила
  идентичны; объединение файлов — отдельная задача. Дубли `App.css`/`Print.css`
  и `Conclusion.css`/`Print.css` — намеренные print-переопределения.
- Проверка: `npm test` — 91 тест, 7 сьютов, зелёные; `npm run build` — успешно.
  `npm run lint` — без новых замечаний; остаются предсуществующие ошибки
  `process is not defined` в `src/serviceWorker.jsx` (вне этапа 5).
