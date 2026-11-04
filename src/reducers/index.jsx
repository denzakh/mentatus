import { combineReducers } from "redux";
import option from "./option";
import sections from "./sections";
import createSectionReducer from "./createSectionReducer";

/*
Корневой редьюсер: настройки + по срезу на каждый раздел статуса.

Раньше здесь был один монолитный срез `psystatus` (~180 полей). Теперь
разделы независимы: `state.zhaloby`, `state.sostoyanie`, `state.affekt` и т.д.
*/
const sectionReducers = Object.keys(sections).reduce((reducers, name) => {
  reducers[name] = createSectionReducer(sections[name]);
  return reducers;
}, {});

export default combineReducers({
  option,
  ...sectionReducers
});
