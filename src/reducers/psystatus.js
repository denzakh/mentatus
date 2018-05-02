import update from 'immutability-helper';

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

export default function psystatus(state = initialState, action) {
  console.dir(action); 
  switch (action.type) {
    case 'SET_SYMPTOM':
    const newState = update(state, {psystatus: {[action.index]: {isChecked: {$set: !state.psystatus[action.index].isChecked}}}});   
    return newState;

    default:
  return state;
  }
}
