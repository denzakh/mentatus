import zhalobyStore from "../store/zhalobyStore";
import anamnezStore from "../store/anamnezStore";
import sostoyanieStore from "../store/sostoyanieStore";
import affektStore from "../store/affektStore";
import rechStore from "../store/rechStore";
import kognitStore from "../store/kognitStore";
import ppStore from "../store/ppStore";
import diagnozStore from "../store/diagnozStore";
import type { StatusSection } from "../types/status";

/*
Срезы статуса: имя раздела -> начальное состояние его полей.

Раньше все поля лежали в одном срезе `psystatus`, собранном спредом всех
store-файлов. Теперь у каждого раздела свой срез, поэтому поле живёт в
`state[section][field]`, а не в `state.psystatus[field]`.
*/
const sections = {
  zhaloby: zhalobyStore,
  anamnez: anamnezStore,
  sostoyanie: sostoyanieStore,
  affekt: affektStore,
  rech: rechStore,
  kognit: kognitStore,
  pp: ppStore,
  diagnoz: diagnozStore
} satisfies Record<string, StatusSection>;

export type SectionStateMap = typeof sections;
export type SectionName = keyof SectionStateMap;
export type StatusState = SectionStateMap;
export type SectionState<K extends SectionName> = SectionStateMap[K];
export type FieldName = {
  [K in SectionName]: keyof SectionStateMap[K] & string;
}[SectionName];

export default sections;

/*
Индекс `поле -> раздел`, выведенный из самих срезов (не второй источник
правды, а обратный указатель). Нужен хелперам чтения, чтобы по имени поля
найти его срез без прокидывания раздела во все вызовы.
*/
export const fieldSections: Record<string, SectionName> = (
  Object.keys(sections) as SectionName[]
).reduce((map, section) => {
  Object.keys(sections[section]).forEach(field => {
    map[field] = section;
  });
  return map;
}, {} as Record<string, SectionName>);
