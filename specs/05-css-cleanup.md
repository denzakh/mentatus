# Этап 5 — Чистка мёртвых CSS-классов

**Статус:** ⏳ запланировано.
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
