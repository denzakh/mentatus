export function updateOneTextOption(name, value) {
  return {
    type: "UPDATE_ONE_TEXT_OPTION",
    name: name,
    value: value
  };
}

// export function saveAllOptionStart(option) {
//   return {
//     type: "SAVE_ALL_OPTION_START",
//     payload: option
//   };
// }

// export function saveAllOptionSuccess() {
//   return {
//     type: "SAVE_ALL_OPTION_SUCCESS"
//   };
// }

// export function saveAllOptionError() {
//   return {
//     type: "SAVE_ALL_OPTION_ERROR"
//   };
// }

export const saveAllOption = option => {
  return dispatch => {
    dispatch({
      type: "SAVE_ALL_OPTION_START"
    });

    setTimeout(() => {
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

      if (getRandomInt(2)) {
        dispatch({
          type: "SAVE_ALL_OPTION_SUCCESS"
        });
      } else {
        dispatch({
          type: "SAVE_ALL_OPTION_ERROR"
        });
      }
    }, 3000);
  };
};
