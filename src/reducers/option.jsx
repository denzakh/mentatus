import update from "immutability-helper";
import optionInitialState from "../store/optionStore.js";

export default function option(state = optionInitialState, action) {
  switch (action.type) {
    case "UPDATE_ONE_TEXT_OPTION":
      return update(state, {
        [action.name]: { $set: action.value },
        isOptionUpdateSuccess: { $set: false },
        isOptionUpdateError: { $set: false },
        isOptionSave: { $set: false }
      });

    case "SAVE_ALL_OPTION_START":
      return update(state, {
        isOptionUpdating: { $set: true },
        isOptionUpdateSuccess: { $set: false },
        isOptionUpdateError: { $set: false }
      });

    case "SAVE_ALL_OPTION_SUCCESS":
      return update(state, {
        isOptionUpdating: { $set: false },
        isOptionUpdateSuccess: { $set: true },
        isOptionUpdateError: { $set: false },
        isOptionSave: { $set: true }
      });

    case "SAVE_ALL_OPTION_ERROR":
      return update(state, {
        isOptionUpdating: { $set: false },
        isOptionUpdateSuccess: { $set: false },
        isOptionUpdateError: { $set: true }
      });

    default:
      return state;
  }
}
