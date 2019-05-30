import { combineReducers } from "redux";
import option from "./option";
import psystatus from "./psystatus";
import psystatusBlank from "./psystatusBlank";
import conclusionList from "./conclusionList";

export default combineReducers({
  option,
  psystatus,
  psystatusBlank,
  conclusionList
});
