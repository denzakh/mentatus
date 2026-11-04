# Этап 2 — Схемный рендеринг разделов из `store/*Data.js`

**Статус:** ⏳ запланировано.
**Зависимости:** этап 1 (срезы) — ✅.
**Цель:** убрать дублирование разметки полей и сделать `store/*Data.js` единственным
источником правды о полях (тип, раздел, подпись, фразы, цикл), чтобы `*Manager`/`*List`
рендерили разделы из схемы, а не хардкодили каждое поле.

## Контекст (текущее состояние)

- Схемы: `src/store/*Data.js`. Запись чекбокса:
  ```js
  zhalobyTrevoga: {
    label: "тревогу", phrase: "тревогу",
    section: "zhaloby", type: "boolean", cicle: "zhalobyCicle"
  }
  ```
  Радиогруппа:
  ```js
  soznanie: {
    data: [{ id, label, phrase }], label: "Сознание", type: "radio",
    section: "sostoyanie", before: "", after: ". "
  }
  ```
- Встречающиеся `type`: `boolean`, `radio`, `string`, `text` (в `diagnozData`).
- Срезы: `state[section][field]` (см. `01-slices.md`).
- Чтение поля: `fieldOf(state, name)` из `src/lib/redux/index.js`.
- Рендеринг сейчас:
  - `src/components/<Section>Manager/index.jsx` — форма раздела: хардкодит разметку
    (колонки, заголовки, условия), использует `CheckboxGroup`, `Checkbox`, `RadioList`,
    `RadioListInline`, `RadioListKogn`, `Textarea`, `TextareaInline`, `InputDate`.
  - `src/components/<Section>List/index.jsx` — часть заключения, использует
    `ListOfWords`, `ListOfSentences`, `OnePraseFromRadio`, `FreeText`,
    `FreeTextBeforeAndAfter`.
  - `CheckboxGroup` уже рендерит цикл `cicle` из схемы.

## Проблемы, которые решаем

- Каждое поле вручную перечислено в JSX → правки в двух местах (схема + разметка).
- Схемы неполные: часть полей есть в `*Store.js`, но отсутствует в `*Data.js` или
  имеет «store-форму» (`{text:""}`) без `section`/`type`.
- Некоторые `section` неверные: в `rechData.js` служебные `*Before/*After/*Not`
  помечены `section: "affekt"`.
- `fieldOf` — временный индекс; после нормализации схем раздел можно брать из схемы.

## Решение: гибрид (рекомендуется)

Не делать «полный автолейаут» (потеряются колонки, вложенность и условная видимость).
Вместо этого:
1. **Нормализовать схемы** — у каждого поля есть `section` и `type`.
2. **Ввести примитивы** `<Field>`, `<Group>`, `<Section>` — рендер по `type`.
3. **Layout остаётся декларативным** — массив блоков (колонки/ряды) с условиями
   `visibleWhen`, который рендерит `<Section>`.
4. Постепенно перевести `*Manager` на layout, `*List` — на `type`-компоненты.

## Шаги

### 2.1. Нормализация схем

Для каждого раздела привести `*Data.js` к полному виду: каждая запись из `*Store.js`
должна быть и в `*Data.js` с `section` и `type`. Добавить/исправить (минимум):

- `anamnezData`: `anamnezText` → `{ section:"anamnez", type:"text" }`.
- `sostoyanieData`: `sostoyanieText`, `mestoText`, `nedobrovolnoText`, `kritikaText`,
  `vozrast`, `dataOsmotra`, `patientId` (типы по смыслу: `text`/`number`).
- `affektData`: `nastroyeniyeText`; сверить `trevogaText`, `sonText`, `appetitText`.
- `rechData`: `myshlenieText`, `rechText` — сейчас store-форма, добавить `section/type`.
- `kognitData`: `orientirText`.
- `ppData`: `bredText`, `gallText`, `opasnyeText` — store-форма → схема.
- `diagnozData`: `reqilech`; сверить `diagnozMkb10`, `diagnozKlin`, `diagnozDopolnenie`.

Исправить неверные `section` у служебных `*Before/*After/*Not` (должны совпадать с
разделом, к которому относятся фразы). Для ввода использовать `type: "text"`,
для фраз без ввода — `"string"`, для радиогрупп — `"radio"`, для чекбоксов — `"boolean"`.

### 2.2. Примитивы рендеринга

Создать три компонента:

- `src/components/Field/index.jsx` — по `name` берёт запись из схемы и рендерит по `type`:
  ```jsx
  const field = dataBase[name];
  switch (field.type) {
    case "boolean": return <Checkbox name={name} dataBase={dataBase} />;
    case "radio":   return <RadioList name={name} dataBase={dataBase} />;
    case "text":
    case "string":  return <Textarea name={name} label={field.label} />;
    default:        return null;
  }
  ```
- `src/components/Group/index.jsx` — обёртка над `CheckboxGroup` для `cicle`.
- `src/components/Section/index.jsx` — рендер layout-массива (см. 2.3).

Пропсы: `section` (имя среза), `dataBase` (схема раздела), `layout`.

### 2.3. Декларативный layout раздела

Определить layout рядом со схемой (`src/store/<section>Layout.js` или
`export const layout` в `*Data.js`). Формат:

```js
export const sostoyanieLayout = [
  {
    type: "row",
    blocks: [
      {
        type: "col",
        blocks: [
          { type: "custom", component: "Nachalo" },
          { type: "group", cicle: "zatrud", visibleWhen: s => s.kontaktZatrudnen },
          { type: "field", name: "soznanie" }
        ]
      },
      {
        type: "col",
        blocks: [
          { type: "group", cicle: "vpech" },
          { type: "field", name: "sostoyanieText" }
        ]
      }
    ]
  }
];
```

`visibleWhen` получает состояние среза и заменяет текущие условия из `mapStateToProps`
(`isZatrud`, `isMestoText`, `isBredHidden`, `showTrevogaOptions` и т.п.).
`custom` — для нестандартных блоков (`NachaloManager`, `OrientirovkaManager`,
`KritikaManager`, `DiagnozManager`).

### 2.4. Перевод `*Manager`

Переписать `<Section>Manager` на
`<Section section="..." dataBase={...} layout={...} />`.
Сохранить существующую визуальную структуру и классы (`manager`, `manager__col`,
`no-break`, `break`, `list__title`, `list__box`, `list__add`, `list__second`).
Особые случаи оставить `custom`-блоками.

### 2.5. Перевод `*List` (заключение)

В `*List` заменить ручной выбор компонента на `type`:
`boolean` → `ListOfWords`/`ListOfSentences`, `radio` → `OnePraseFromRadio`,
`text` → `FreeText`, группы — по `cicle`.
Скрытие раздела (`isHidden`) оставить в `mapStateToProps` — это правило, а не рендер.

### 2.6. Убрать `fieldOf` (опционально)

После нормализации схем компоненты могут читать `state[dataBase[name].section][name]`.
Тогда `fieldOf`/`sectionOf` удаляются, а `flagsOf` принимает `section`. Делать только
если все схемы прошли тест полноты (см. ниже).

## Критерии приёмки

- Для каждого поля из `sections` есть запись в соответствующем `*Data.js` с
  `section`/`type` (проверяется тестом).
- `*Manager` не перечисляют поля вручную (кроме `custom`-блоков).
- Визуально приложение не изменилось (регрессионный чек-лист из `README.md`).
- Тесты и сборка зелёные.

## Проверка

```bash
CI=true npx react-scripts test --env=jsdom
npx react-scripts build
npx eslint src --ext .js,.jsx
```

Добавить `src/store/schema.test.js`: для каждого раздела каждое поле `Store` описано в
`Data` с корректными `section`/`type`; `section` совпадает с ключом среза.

## Риски

- **Потеря layout/условий** — поэтому layout декларативный, а не автогенерация.
- **Неполные схемы** — сначала 2.1 + тест полноты, только потом рендер.
- **Смешение с другими этапами** — не менять форму стора, persist, стек.

## Границы этапа

- Не подключать redux-persist/RTK/Vite/TS.
- Не менять тексты фраз и бизнес-правила (только структуру рендера).
