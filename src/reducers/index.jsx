import { combineReducers } from "redux";
import general from "./general";
import option from "./option";
import psystatus from "./psystatus";
import psystatusBlank from "./psystatusBlank";
import conclusionList from "./conclusionList";

export default combineReducers({
  general,
  option,
  psystatus,
  psystatusBlank,
  conclusionList
});
