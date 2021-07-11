import update from "immutability-helper";

const initialState = {
  name: "Аноним"
};

export default function option(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
