import update from "immutability-helper";

const initialState = {
  activePageName: "Repository"
};

export default function option(state = initialState, action) {
  switch (action.type) {
    case "SET_PAGE":
      return update(state, {
        activePageName: { $set: action.name }
      });

    default:
      return state;
  }
}

// dataIsLoadingOrSaving
