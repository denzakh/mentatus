import zhalobyData from "./zhalobyData";
import anamnezData from "./anamnezData";
import sostoyanieData from "./sostoyanieData";
import affektData from "./affektData";
import rechData from "./rechData";
import kognitData from "./kognitData";
import ppData from "./ppData";
import diagnozData from "./diagnozData";
import type { Schema } from "../types/schema";
import type { SectionName } from "../types/status";

/*
Схемы разделов: имя среза -> описание его полей (*Data.js).

Порядок ключей совпадает с порядком срезов в `src/reducers/sections.js`.
Каждая запись схемы описывает поле стора: `section` (срез, где лежит поле),
`type` (boolean | radio | string | text | number) и подпись/фразы/цикл.
Полноту схем проверяет `src/store/schema.test.js`.
*/
const schemas: Record<SectionName, Schema> = {
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
