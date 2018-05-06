import update from 'immutability-helper';
import zhalobyStore from "../store/zhalobyStore.js"

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
  ],
  ...zhalobyStore
}

export default function psystatus(state = initialState, action) {
  switch (action.type) {
    case 'SET_SYMPTOM':
    return update(state, {[action.name]: {isChecked: {$set: !state[action.name].isChecked}}});   

    case 'SET_TEXT':
    return update(state, {[action.name]: {text: {$set: action.text}}});   

    default:
  return state;
  }
}
