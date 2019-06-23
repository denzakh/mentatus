import { combineReducers } from "redux";
import general from "./general";
import option from "./option";
import psystatus from "./psystatus";
import repository from "./repository";

export default combineReducers({
  general,
  option,
  psystatus,
  repository
});
