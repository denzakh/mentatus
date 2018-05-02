// import { combineReducers } from "redux";
// // import { moveOrderToCustomer } from "../actions/farmActions";
// // import { createOrder, moveOrderToFarm } from "../actions/marketActions";
// import first from "./first";
// // import farm from "./farm";
// // import market from "./market";

// const combine = combineReducers({
//   first
//   // farm,
//   // market
// });

// export default combine;
// 
const initialState = {
  psystatus: [
    { name: "wellcome",
      label: "Приветствие",
      isChecked: true,
      phrase: "Добро пожаловать на сайт!"
    },
    { name: "option1",
      label: "Свойство 1",
      isChecked: true,
      phrase: "Описание свойства 1"
    },
    { name: "option2",
      label: "Свойство 2",
      isChecked: true,
      phrase: "Описание свойства 2"
    }        
  ]
}

export default function userstate(state = initialState) {
  return state;
}
