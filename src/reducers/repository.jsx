import update from "immutability-helper";
import psystatusInitialState from "./psystatusInitialState";

function getInitialState() {
  let firstStatus = { ...psystatusInitialState };
  let date = new Date();
  firstStatus.id = date.getTime();
  firstStatus.isOpen = true;
  let initialState = [firstStatus];
  return initialState;
}

function getOpenStatusIndex(state) {
  let openStatusIndex;
  state.forEach((item, i) => {
    if (item.isOpen === true) {
      openStatusIndex = i;
    }
  });
  return openStatusIndex;
}

// собирает новый список  после удаления одного из статусов
function getStateAfterDeliteStatus(state, action) {
  let ArrWithDeliteStatus = state.filter(item => +item.id !== +action.id);
  let isAnyOpenStatus = false;
  ArrWithDeliteStatus.forEach(item => {
    if (item.isOpen === true) {
      isAnyOpenStatus = true;
    }
  });
  if (!isAnyOpenStatus) {
    ArrWithDeliteStatus[0].isOpen = true;
  }
  return ArrWithDeliteStatus;
}

// основной редьюсер, управляет действиями со списком статусов и внутри одного статуса
export default function repository(state = getInitialState(), action) {
  let openStatusIndex = getOpenStatusIndex(state);

  // управление списком статусов
  switch (action.type) {
    case "CREATE_NEW_STATUS":
      let psystatusBlank = { ...psystatusInitialState };
      psystatusBlank.id = +action.id;
      return update(state, {
        $push: [psystatusBlank]
      });

    case "DELETE_STATUS":
      let stateWithDeliteStatus = getStateAfterDeliteStatus(state, action);

      return update(state, {
        $set: stateWithDeliteStatus
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

    // управление внутри одного статуса

    // обновление булева симптома
    case "SET_SYMPTOM":
      return update(state, {
        [openStatusIndex]: {
          [action.name]: { isChecked: { $apply: boolean => !boolean } }
        }
      });

    // обновление текстового симптома
    case "SET_TEXT":
      return update(state, {
        [openStatusIndex]: { [action.name]: { text: { $set: action.text } } }
      });

    // обновление симптома, выборанного из списка (установка его номера в БД)
    case "SET_RADIO":
      return update(state, {
        [openStatusIndex]: {
          [action.name]: { number: { $set: action.number } }
        }
      });

    default:
      return state;
  }
}
