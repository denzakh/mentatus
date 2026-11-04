/* Чистые функции декларативного layout раздела (см. `src/store/*Layout.js`).

   Блок layout — объект с полем `type`:
     row / col / box — обёртка <div className>, необязательный title
     title           — подпись группы полей (text либо label в <span>)
     field           — поле формы (<Field>, тип берётся из схемы)
     group           — группа чекбоксов цикла (<Group>)
     custom          — компонент из карты custom-блоков раздела
     br              — перенос строки
   Общие поля блока: `blocks` (вложенные блоки), `dataBase` (своя схема),
   `visibleWhen` (условие видимости, получает состояние среза).
*/

// ключ блока: путь индексов от корня layout
export function blockKey(path) {
  return path.join(".");
}

/* Собирает видимость блоков с `visibleWhen` в один плоский объект
   `{ ключ блока: true/false }`. Нужно, чтобы connect сравнивал только
   изменившиеся условия, а не перерисовывал раздел на каждый ввод. */
export function collectVisibility(layout, slice) {
  const visibility = {};

  const walk = (blocks, path) => {
    (blocks || []).forEach((block, index) => {
      const nextPath = path.concat(index);
      const key = blockKey(nextPath);

      if (block.visibleWhen) {
        visibility[key] = !!block.visibleWhen(slice);
      }

      if (block.blocks) {
        walk(block.blocks, nextPath);
      }
    });
  };

  walk(layout, []);
  return visibility;
}
