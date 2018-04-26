import { CASE_PLUS, CASE_MINUS } from "../actions/caseTypes";

let initialState = {
  pole: 0
};

export default function first(state = initialState, action) {
  switch (action.type) {
    case "CASE_PLUS":
      return Object.assign({}, state, {
        pole: state.pole + 1
      });
    case "CASE_MINUS":
      return Object.assign({}, state, {
        pole: state.pole - 1
      });
    default:
      return state;
  }
}

// {
//   first: {
//     pole: []
//   }
// }
