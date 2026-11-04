import { combineReducers } from "redux";
import option from "./option";
import sections from "./sections";
import createSectionSlice from "./createSectionSlice";

/*
Корневой редьюсер: настройки + по срезу на каждый раздел статуса.

Раньше здесь был один монолитный срез `psystatus` (~180 полей). Теперь
разделы независимы: `state.zhaloby`, `state.sostoyanie`, `state.affekt` и т.д.
Срезы собираются фабрикой `createSectionSlice` (RTK + Immer).
*/
const sectionReducers = Object.keys(sections).reduce((reducers, name) => {
  reducers[name] = createSectionSlice(name, sections[name]).reducer;
  return reducers;
}, {});

export default combineReducers({
  option,
  ...sectionReducers
});
