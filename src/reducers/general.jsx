import update from "immutability-helper";

const initialState = {
  activePageName: "Option"
};

export default function general(state = initialState, action) {
  switch (action.type) {
    case "SET_PAGE":
      return update(state, {
        activePageName: { $set: action.name }
      });

    case "SAVE_STORE_ON_SERVER":
      console.log(action.type);
      return update(state, {
        dataIsLoadingOrSaving: { $set: true }
      });

    case "LOAD_STORE_FROM_SERVER":
      console.log(action.type);
      return update(state, {
        dataIsLoadingOrSaving: { $set: true }
      });

    case "LOAD_STORE_FROM_SERVER_SUCCESS":
      console.log(action.type);
      // let newState = action.payload;
      return update(state, {
        dataIsLoadingOrSaving: { $set: false }
      });

    case "LOAD_STORE_FROM_SERVER_ERROR":
      console.log(action.type);
      return state;

    case "SAVE_USER_SUCCESS":
      return update(state, {
        dataIsLoadingOrSaving: { $set: false },
        userId: { $set: action.payload.objectId },
        userCreated: { $set: action.payload.created },
        userUpdated: { $set: action.payload.updated }
      });

    default:
      return state;
  }
}

// dataIsLoadingOrSaving
