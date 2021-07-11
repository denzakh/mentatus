import update from "immutability-helper";
import psystatusInitialState from "./psystatusInitialState";
const initialState = [];

export default function repository(state = initialState, action) {
  switch (action.type) {
    case "CREATE_NEW_STATUS":
      let psystatusBlank = { ...psystatusInitialState };
      psystatusBlank.id = +action.id;
      return update(state, {
        $push: [psystatusBlank]
      });

    case "DELETE_STATUS":
      let stateWithSeliteStatus = state.filter(item => +item.id !== +action.id);
      return update(state, {
        $set: stateWithSeliteStatus
      });

    case "OPEN_STATUS":
      let stateWithOpenStatus = state.map(item => {
        item.isOpen = false;
        if (+item.id === +action.id) {
          item.isOpen = true;
        }
        return item;
      });
      return update(state, {
        $set: stateWithOpenStatus
      });

    case "CLOSE_STATUS":
      let stateWithCloseStatus = state.map(item => {
        item.isOpen = false;
        return item;
      });
      return update(state, {
        $set: stateWithCloseStatus
      });

    default:
      return state;
  }
}

// {$add: array of objects}
