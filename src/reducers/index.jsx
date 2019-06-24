import { combineReducers } from "redux";
import general from "./general";
import option from "./option";
import repository from "./repository";

export default combineReducers({
  general,
  option,
  repository
});
