import type { RadioGroupSchema, RadioOption } from "../../types/schema";

/* Работа со схемами радиогрупп (`data: RadioOption[]`). */

/* Пункт группы по номеру (id), а не по позиции в массиве.

   В схемах `id` — стабильный идентификатор пункта, а порядок массива может
   меняться. Обращение `group.data[number]` (как было в `NachaloList`) молча
   выдаёт чужую фразу при перестановке пунктов и падает на неизвестном номере. */
export function optionById(
  group: Pick<RadioGroupSchema, "data"> | undefined,
  id: number | undefined
): RadioOption | undefined {
  if (!group || !group.data || id === undefined) {
    return undefined;
  }

  return group.data.find(item => +item.id === +id);
}