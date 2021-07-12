import update from "immutability-helper";
import initialState from "./psystatusInitialState";

export default function psystatus(state = initialState, action) {
  switch (action.type) {
    case "SET_SYMPTOM":
      return update(state, {
        [action.name]: { isChecked: { $set: !state[action.name].isChecked } }
      });

    case "SET_TEXT":
      return update(state, { [action.name]: { text: { $set: action.text } } });

    case "SET_RADIO":
      return update(state, {
        [action.name]: { number: { $set: action.number } }
      });

    default:
      return state;
  }
}
