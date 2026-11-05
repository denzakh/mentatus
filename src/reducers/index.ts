import { combineReducers } from "redux";
import type { Reducer } from "redux";

import zhalobyStore from "../store/zhalobyStore";
import anamnezStore from "../store/anamnezStore";
import sostoyanieStore from "../store/sostoyanieStore";
import affektStore from "../store/affektStore";
import rechStore from "../store/rechStore";
import kognitStore from "../store/kognitStore";
import ppStore from "../store/ppStore";
import diagnozStore from "../store/diagnozStore";

import createSectionSlice from "./createSectionSlice";
import type { SectionName, SectionStateMap } from "./sections";

/*
Корневой редьюсер: по срезу на каждый раздел статуса.

Раньше здесь был один монолитный срез `psystatus` (~180 полей). Теперь
разделы независимы: `state.zhaloby`, `state.sostoyanie`, `state.affekt` и т.д.
Срезы собираются фабрикой `createSectionSlice` (RTK + Immer).

Служебного среза `option` больше нет: настройки UI нигде не менялись,
поэтому разделы «Настройки»/«Заключения» и их навигация удалены.

`reduce` по ключам `sections` не типизируется без приведений (ковариантность
`Reducer<S>` и индексация mapped-типа по union-ключу), поэтому карта
редьюсеров собирается явно — по одному срезу на раздел, без приведений.
*/

type SectionReducers = {
  zhaloby: Reducer<SectionStateMap["zhaloby"]>;
  anamnez: Reducer<SectionStateMap["anamnez"]>;
  sostoyanie: Reducer<SectionStateMap["sostoyanie"]>;
  affekt: Reducer<SectionStateMap["affekt"]>;
  rech: Reducer<SectionStateMap["rech"]>;
  kognit: Reducer<SectionStateMap["kognit"]>;
  pp: Reducer<SectionStateMap["pp"]>;
  diagnoz: Reducer<SectionStateMap["diagnoz"]>;
};

const sectionReducers: SectionReducers = {
  zhaloby: createSectionSlice("zhaloby", zhalobyStore).reducer,
  anamnez: createSectionSlice("anamnez", anamnezStore).reducer,
  sostoyanie: createSectionSlice("sostoyanie", sostoyanieStore).reducer,
  affekt: createSectionSlice("affekt", affektStore).reducer,
  rech: createSectionSlice("rech", rechStore).reducer,
  kognit: createSectionSlice("kognit", kognitStore).reducer,
  pp: createSectionSlice("pp", ppStore).reducer,
  diagnoz: createSectionSlice("diagnoz", diagnozStore).reducer
};

const rootReducer = combineReducers(sectionReducers);

// форма всего состояния стора (используется в connect и хелферах)
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
