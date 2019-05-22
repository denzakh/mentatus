import { combineReducers } from "redux";
import user from "./user";
import psystatus from "./psystatus";
import psystatusBlank from "./psystatusBlank";
import conclusionList from "./conclusionList";

export default combineReducers({
  user,
  psystatus,
  psystatusBlank,
  conclusionList
});
