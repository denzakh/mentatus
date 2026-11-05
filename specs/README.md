# Спеки рефакторинга Mentatus

Эта папка — набор самодостаточных спек по этапам рефакторинга. Каждый файл можно
открыть в отдельной сессии и выполнить независимо: внутри есть необходимый контекст,
точные пути, шаги, критерии приёмки и проверка.

## Дорожная карта

| # | Этап | Файл | Статус | Зависит от |
|---|------|------|--------|------------|
| 1 | Разбиение `psystatus` на срезы по разделам | `01-slices.md` | ✅ выполнено | — |
| 2 | Схемный рендеринг разделов из `store/*Data.js` | `02-schema-rendering.md` | ✅ выполнено | 1 |
| 3 | `redux-persist` вместо самописного localStorage | `03-redux-persist.md` | ✅ выполнено | 1 |
| 4 | Обновление стека (Vite + React 18 + RTK + vitest) | `04-stack-upgrade.md` | ✅ выполнено | 1–3 |
| 5 | Чистка мёртвых CSS-классов | `05-css-cleanup.md` | ✅ выполнено | 4 |
| 6 | Перевод на TypeScript | `06-typescript.md` | ✅ выполнено | 4–5 |
| 7 | B.1 — Бизнес-правила и тексты заключения → `lib` + тесты | `07-render-unification.md` (B.1) | ✅ выполнено | 6 |
| 8 | B.2 — Единый реестр разделов | `07-render-unification.md` (B.2) | ✅ выполнено | 7 |
| 9 | B.3 — Унификация полей | `07-render-unification.md` (B.3) | ✅ выполнено | 8 |
| 10 | B.4 — Функциональные компоненты + hooks | `07-render-unification.md` (B.4) | ⏳ | 9 |

Подэтапы 7–10 описаны в одном файле `07-render-unification.md`: каждый — отдельный
PR и отдельная сессия, порядок обязателен (B.1 → B.2 → B.3 → B.4). Внутри файла у
каждого подэтапа свои шаги, критерии приёмки и границы.

Правило: этапы выполняются по порядку, каждый — отдельный PR/коммит с зелёными
тестами и сборкой. Два этапа в одном изменении не смешивать.

## Текущее состояние (baseline после этапа 4)

- Стек: React 18.3, react-dom 18.3, react-redux 9.3, redux 5.0,
  @reduxjs/toolkit 2.14, redux-persist 6, classnames 2.5. CRA (`react-scripts`),
  `immutability-helper` и service worker удалены.
- Node v24.21.0, npm 11.19.0. `npm install` работает, сеть до npm есть.
- Сборка и dev: Vite 6 (`npm run dev`, `npm run build` → `dist/`,
  `npm run preview`); конфиг — `vite.config.js` (`base: "./"`,
  `publicDir: "public"`, vitest в секции `test`). Entry — корневой `index.html`
  и `src/index.jsx` (`createRoot`, React 18).
- Стор: `combineReducers({ option, zhaloby, anamnez, sostoyanie, affekt, rech, kognit, pp, diagnoz })`;
  срезы собирает фабрика `src/reducers/createSectionSlice.js` (RTK + Immer),
  стор — `configureStore` из RTK (`src/configureStore.js`).
- Монолитный `psystatus` удалён, поля живут в `state[section][field]`.
- Персист: `redux-persist@6`, конфиг — `src/store/persist.js` (whitelist срезов,
  `key: "mentatus"`, `version: 2`, ключ в localStorage — `persist:mentatus`),
  `PersistGate` в `src/index.jsx`; старый ключ `mentatus:v2` удаляется при старте.
- Чтение поля: `fieldOf(state, name)` / `sectionOf(name)` из `src/lib/redux/index.js`.
- Экшены: `SET_SYMPTOM` / `SET_TEXT` / `SET_RADIO` — креаторы
  `src/actions/fieldActions.js` (RTK `createAction`, данные в `payload`);
  `src/actions/{symptom,text,radio}Action` — ре-экспорты для совместимости.
- Схемы разделов: `src/store/*Data.js`; начальные значения: `src/store/*Store.js`.
  Полноту схем (поле → `section`/`type`) проверяет `src/store/schema.test.js`,
  карта схем — `src/store/schemas.js`.
- Рендеринг: `*Manager` → `<Section section dataBase layout />`
  (раскладка — `src/store/*Layout.js`), `*List` → `<FieldView>` по типу поля,
  примитивы — `src/components/{Field,Group,Section,FieldView}`.
- Тесты: 7 сьютов / 91 тест (`src/lib/text`, `src/lib/rules`, `src/lib/layout`,
  `src/reducers`, `src/store`, smoke `src/index.test.jsx`).
  `npm test` = `vitest run` (один прогон, без watch), `npm run test:watch` —
  режим разработки. Окружение jsdom, глобальные `describe/it/expect/vi`,
  `src/setupTests.js` подключает `@testing-library/jest-dom/vitest`.
- Линт: ESLint 9, плоский конфиг `eslint.config.mjs` (`@eslint/js` +
  `eslint-plugin-react`, `react/prop-types` off, `no-unused-vars` warn).
  `npm run lint` — без ошибок.
- `grep -rn "process.env" src` — пусто (service worker удалён).

## Baseline после этапа 6 (TypeScript)

- Вся `src` — TypeScript (`.ts`/`.tsx`), `allowJs: false`; конфиг — `tsconfig.json`
  (`strict: false`, `moduleResolution: "Bundler"`, `jsx: "react-jsx"`),
  `src/vite-env.d.ts`, проверка — `npm run typecheck` (`tsc --noEmit`).
- Типы состояния — `src/types/status.ts` (`FieldValue`, `SectionName`,
  `StatusSection`, `StatusState`), схем — `src/types/schema.ts`,
  раскладок — `src/types/layout.ts`, общих пропсов — `src/types/components.ts`.
- `RootState` — `ReturnType` корневого редьюсера (`src/reducers/index.ts`),
  используется в `connect` и `persist`.
- Линт TS — через `typescript-eslint` в том же плоском конфиге; vitest
  подхватывает `*.test.{ts,tsx}`, `setupFiles` — `src/setupTests.ts`.
- Проверки этапа: `tsc --noEmit` — чисто, 91 тест, сборка `dist/` (169 модулей),
  `eslint src` — 0 ошибок. Следующий шаг по спеке 6.4 — поэтапное включение
  `strict` (сначала `src/lib` и `src/reducers`).

## Baseline после B.1 (бизнес-правила и тексты в `lib`)

- `src/lib/rules/visibility.ts` — `isContactUnavailable`,
  `isConsciousnessClouded`, `isDescriptiveHidden`, `isZhalobyHidden`,
  `isRechMainHidden` и константы `CONTACT_UNAVAILABLE = 2`,
  `CONSCIOUSNESS_CLOUDED = 7`. В `Conclusion`, `ZhalobyList`, `RechList`
  условий видимости больше нет — только вызовы `lib`.
- `src/lib/text/nachalo.ts` — `buildNachaloText`: дословная склейка «Начала
  осмотра» (двойной пробел в ст. 23 ч.4, «его/ее», «Освидетельствован/а»,
  пустые радиогруппы не роняют вывод). `NachaloList` только собирает
  `NachaloInput` и рендерит строки.
- `src/lib/text/orientation.ts` — `orientationKey` / `orientationPhrase`:
  `orientir000`, незаполненные группы → 0, фолбэк `""`, нарушенная речь.
- Характеризационные тесты текстов (сняты до переноса, зелёные после):
  `src/components/NachaloList/characterization.test.tsx`,
  `src/components/OrientirovkaList/characterization.test.tsx`; стор без
  персиста для проверок разметки — `src/testUtils/statusStore.tsx`.
- Unit-тесты `lib`: `src/lib/rules/visibility.test.ts`,
  `src/lib/text/nachalo.test.ts`, `src/lib/text/orientation.test.ts`.
- Проверки B.1: `typecheck` — 0 ошибок, 13 файлов / 142 теста, `lint` — 0,
  сборка `dist/` (167 модулей). Разметка, классы и порядок вывода не менялись.

## Baseline после B.2 (единый реестр разделов)

- `src/sections/registry.ts` — единственное место, где перечислены разделы:
  `sectionsRegistry` (schema + layout + custom-блоки + форма),
  `tabOrder` (порядок вкладок) и `conclusionOrder` (порядок и абзацы
  заключения, флаг `hiddenWhenDescriptive`).
- `TabMenu` строит вкладки по `tabOrder`, `TabRender` — форму по
  `sectionsRegistry[activeTab]` (`form: "section"` → `<Section>`, иначе
  собственный компонент), `Conclusion` — три абзаца по `conclusionOrder`.
  Ни один из них не перечисляет разделы и не импортирует `*Manager`/`*List`.
- Удалены 7 файлов-обёрток: `ZhalobyManager`, `AnamnezManager`,
  `SostoyanieManager`, `AffektManager`, `RechManager`, `KognitManager`,
  `PpManager` (+ дубль `KognitManager/Kognit.css`, классы `.orientir__*`
  остались в `OrientirovkaManager/Orientirovka.css`). Оставлены формы и
  custom-блоки: `DiagnozManager`, `NachaloManager`, `OrientirovkaManager`,
  `KritikaManager`.
- Тест реестра — `src/sections/registry.test.ts` (11 тестов): ключи совпадают
  со срезами `reducers/sections`, `schema === schemas[name]`, `form: "section"`
  ⇒ layout, согласованность custom-блоков layout и карты `components`,
  8 уникальных вкладок в прежнем порядке, посимвольные символы «ОC»/«АH»,
  порядок заключения `anamnez, sostoyanie, zhaloby, kognit, affekt, rech,
  kognit, pp, diagnoz` и наличие всех 8 разделов.
- Проверки B.2: `typecheck` — 0 ошибок, 14 файлов / 153 теста, `lint` — 0,
  сборка `dist/` (161 модуль). DOM меню и заключения сравнён с версией до
  рефакторинга (`innerHTML` совпал для `kontakt = 0/2/7`), каждая вкладка
  рендерит свою форму, неизвестная вкладка — пустой `.tab-render`.

## Baseline после B.3 (унификация полей)

- `src/components/RadioOptions/index.tsx` — общая презентационная радиогруппа
  (`variant: "list" | "inline"`, `itemClassName`, `onChange(value)`); `RadioList`,
  `RadioListInline`, `RadioListKogn` — тонкие обёртки с `connect`.
- `src/components/TextField/index.tsx` — общее поле текста
  (`variant: "textarea" | "inline" | "date"`); `Textarea`, `TextareaInline`,
  `InputDate` передают вариант, `style` по-прежнему только у `Textarea`.
- `src/components/Checkbox/CheckboxView.tsx` — общий чекбокс
  (`variant: "default" | "otkl" | "pol"`); `Checkbox`, `CheckboxOtkl`,
  `CheckboxPol` — тонкие обёртки, подписи пола (`"Пол: мужской  ⇄"` /
  `"Пол: женский  ⇄"`) вынесены в `CheckboxView`.
- `src/components/fields/registry.ts` — единственное место соответствий
  «тип/имя поля → компонент»: `formByType`, `formByName`, `viewByType`,
  `formForField`, `viewForField`; `Field`/`FieldView` собственных карт больше
  не содержат. Выбор `FreeText` / `FreeTextBeforeAndAfter` — в
  `src/components/FreeTextView`.
- `src/lib/redux` — общие хелперы чтения `textOf`, `radioOptionsOf`,
  `radioSelectedOf`; `src/lib/rules/kritika` — `AUTO_KRITIKA_BY_OPTION`
  и `autoKritikaForOption` (локальной константы в `RadioListKogn` нет).
- Тесты полей (12 новых файлов): `RadioOptions`, `RadioList`, `RadioListInline`,
  `RadioListKogn`, `TextField`, `Textarea`, `TextareaInline`, `InputDate`,
  `Checkbox`, `CheckboxOtkl`, `CheckboxPol`, `Field`, `FieldView`
  + `fields/registry.test.ts`, `lib/redux/index.test.ts`,
  дополненный `lib/rules/kritika.test.ts`.
- Проверки B.3: `typecheck` — 0 ошибок, 29 файлов / 223 теста, `lint` — 0,
  сборка `dist/` (166 модулей). DOM каждого поля, `Field` и `FieldView`
  сравнён с версией до унификации (`innerHTML` совпал посимвольно для всех
  вариантов: list/inline радиогруппы, три текстовых поля, три чекбокса,
  все типы схемы и `component` из layout).

## Обслуживание после этапа 6 (вариант A)

- Удалены артефакты прошлых рефакторингов: `*.rej`, дубли `reducers/index.tsx`
  и `reducers/option.tsx`, неиспользуемые `store/{rekomendacii,lechenie,kogtest}*`.
- Удалён служебный срез `option` и заглушки страниц «Настройки»/«Заключения»
  (`containers/Option`, `containers/Repository`, `containers/pages`): активная
  страница никогда не переключалась. `ActivePage` рендерит `App` напрямую.
- Удалены заглушки `KogtestManager`/`KogtestList` и их упоминания в `TabRender`,
  `Conclusion`, `TabMenu`.
- `NachaloList` ищет пункты радиогрупп по `id` (`lib/schema.optionById`), а не по
  позиции в массиве; добавлены пропущенные фразы ориентировки
  (`orientir231/331/332`), полнота таблицы проверяется тестом.
- `Field` пробрасывает `autoKritika`; `RadioListKogn` не зависит от того, что
  `id` пунктов идут подряд; `persistStore` пишет в localStorage с `throttle: 300`.
- Обновлены dev-зависимости: `vitest` 5, `jsdom` 30, `prettier` 3, `gh-pages` 6;
  удалены неиспользуемые `husky` и `lint-staged`.
- Добавлены `README.md` и CI (`.github/workflows/ci.yml`).

## Общие соглашения

- Стиль: Prettier (`.prettierrc`: printWidth 80, 2 пробела, двойные кавычки,
  без trailing comma, arrowParens avoid). ESLint 9: плоский конфиг
  `eslint.config.mjs` (`@eslint/js` + `eslint-plugin-react`).
- Комментарии и тексты — на русском, как в коде.
- Поле стора имеет форму `{ isChecked }` | `{ number }` | `{ text }`.
- Схема поля (`*Data.js`): `label`, `phrase`, `section`, `type`
  (`boolean` | `radio` | `string` | `text`), `cicle`, `hint`, `before`/`after`/`not`.
- Перед коммитом: `npm test` + `npm run build` + `npm run lint`.

## Как запускать этап в отдельной сессии

1. Открыть `specs/NN-*.md`, прочитать «Цель», «Контекст», «Зависимости».
2. Убедиться, что предыдущие этапы в статусе ✅ (иначе сначала они).
3. Выполнить «Шаги» по порядку, не выходя за «Границы этапа».
4. Прогнать «Проверку» — все команды должны быть зелёными.
5. Обновить статус этапа в таблице выше и закоммитить отдельно.

## Общий Definition of Done

- `npm test` — все тесты зелёные (один прогон `vitest run`, без watch).
- `npm run build` — успешно (`dist/`).
- `npm run lint` — без ошибок.
- Нет регрессий по ручному чек-листу ниже.

## Ручной регрессионный чек-лист

1. «Общее состояние»: дата/пол/место осмотра, недобровольный осмотр, сознание,
   контакт, впечатление, критика.
2. «Анамнез»: чекбоксы, «не показывать», текст.
3. «Жалобы»: чекбоксы, текст; скрытие при нарушенной речи/контакте/сознании.
4. «Аффект»: настроение, тревога, сон, аппетит, зависимые блоки.
5. «Речь и мышление», «Интеллект и память» (ориентировка, пальцы), «Психопродукция».
6. «Диагноз»: МКБ-10, основной/доп., рекомендации.
7. Заключение справа собирается по смыслу; «Копировать» и «Печать».
8. Переключение вкладок; перезагрузка страницы (после этапа 3 — состояние сохраняется).
