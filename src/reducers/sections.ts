import zhalobyStore from "../store/zhalobyStore.js";
import anamnezStore from "../store/anamnezStore.js";
import sostoyanieStore from "../store/sostoyanieStore.js";
import affektStore from "../store/affektStore.js";
import rechStore from "../store/rechStore.js";
import kognitStore from "../store/kognitStore.js";
import ppStore from "../store/ppStore.js";
import diagnozStore from "../store/diagnozStore.js";

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
};

export default sections;

/*
Индекс `поле -> раздел`, выведенный из самих срезов (не второй источник
правды, а обратный указатель). Нужен хелперам чтения, чтобы по имени поля
найти его срез без прокидывания раздела во все вызовы.
*/
export const fieldSections = Object.keys(sections).reduce((map, section) => {
  Object.keys(sections[section]).forEach(field => {
    map[field] = section;
  });
  return map;
}, {});
