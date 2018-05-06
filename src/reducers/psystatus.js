import update from 'immutability-helper';
import zhalobyStore from "../store/zhalobyStore.js"
import anamnezStore from "../store/anamnezStore.js"



const initialState = {
  ...zhalobyStore,
  ...anamnezStore
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
