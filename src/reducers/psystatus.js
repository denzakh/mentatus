import update from "immutability-helper";
import zhalobyStore from "../store/zhalobyStore.js";
import anamnezStore from "../store/anamnezStore.js";
import sostoyanieStore from "../store/sostoyanieStore.js";
import affektStore from "../store/affektStore.js";
import rechStore from "../store/rechStore.js";
import kognitStore from "../store/kognitStore.js";
import ppStore from "../store/ppStore.js";
import diagnozStore from "../store/diagnozStore.js";
import rekomendaciiStore from "../store/rekomendaciiStore.js";
import lechenieStore from "../store/lechenieStore.js";

const initialState = {
  ...zhalobyStore,
  ...anamnezStore,
  ...sostoyanieStore,
  ...affektStore,
  ...rechStore,
  ...kognitStore,
  ...ppStore,
  ...diagnozStore,
  ...rekomendaciiStore,
  ...lechenieStore
};

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
