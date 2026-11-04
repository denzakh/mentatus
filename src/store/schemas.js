import zhalobyData from "./zhalobyData.js";
import anamnezData from "./anamnezData.js";
import sostoyanieData from "./sostoyanieData.js";
import affektData from "./affektData.js";
import rechData from "./rechData.js";
import kognitData from "./kognitData.js";
import ppData from "./ppData.js";
import diagnozData from "./diagnozData.js";

/*
Схемы разделов: имя среза -> описание его полей (*Data.js).

Порядок ключей совпадает с порядком срезов в `src/reducers/sections.js`.
Каждая запись схемы описывает поле стора: `section` (срез, где лежит поле),
`type` (boolean | radio | string | text | number) и подпись/фразы/цикл.
Полноту схем проверяет `src/store/schema.test.js`.
*/
const schemas = {
  zhaloby: zhalobyData,
  anamnez: anamnezData,
  sostoyanie: sostoyanieData,
  affekt: affektData,
  rech: rechData,
  kognit: kognitData,
  pp: ppData,
  diagnoz: diagnozData
};

export default schemas;
