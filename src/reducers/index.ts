import { combineReducers } from "redux";
import type { Reducer } from "redux";
import sections from "./sections";
import createSectionSlice from "./createSectionSlice";
import type { SectionName, StatusSection } from "../types/status";

/*
Корневой редьюсер: по срезу на каждый раздел статуса.

Раньше здесь был один монолитный срез `psystatus` (~180 полей). Теперь
разделы независимы: `state.zhaloby`, `state.sostoyanie`, `state.affekt` и т.д.
Срезы собираются фабрикой `createSectionSlice` (RTK + Immer).

Служебного среза `option` больше нет: настройки UI нигде не менялись,
поэтому разделы «Настройки»/«Заключения» и их навигация удалены.
*/
const sectionReducers = (Object.keys(sections) as SectionName[]).reduce(
  (reducers, name) => {
    reducers[name] = createSectionSlice(name, sections[name]).reducer;
    return reducers;
  },
  {} as Record<SectionName, Reducer<StatusSection>>
);

const rootReducer = combineReducers(sectionReducers);

// форма всего состояния стора (используется в connect и хелперах)
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
