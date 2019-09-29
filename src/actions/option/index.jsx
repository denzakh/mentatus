import Backendless from "backendless";

const APP_ID = "0E5B183F-2CAF-AE3F-FF18-A91BB0BF0200";
const API_KEY = "E6A07455-F8EA-CB77-FFC6-3A3E2CEF4C00";
Backendless.serverURL = "https://api.backendless.com";
Backendless.initApp(APP_ID, API_KEY);

export function updateOneTextOption(name, value) {
  return {
    type: "UPDATE_ONE_TEXT_OPTION",
    name: name,
    value: value
  };
}

export const saveAllOption = option => {
  return dispatch => {
    dispatch({
      type: "SAVE_ALL_OPTION_START"
    });

    let optionJson = JSON.stringify(option);

    Backendless.Data.of("User")
      .save({ option: optionJson })
      .then(obj => {
        console.log("option save: " + obj.objectId);
        dispatch({
          type: "SAVE_ALL_OPTION_SUCCESS"
        });
      })
      .catch(error =>
        dispatch({
          type: "SAVE_ALL_OPTION_ERROR"
        })
      );
  };
};
