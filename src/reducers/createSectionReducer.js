import update from "immutability-helper";

/*
Фабрика редьюсера раздела.

Экшены SET_SYMPTOM / SET_TEXT / SET_RADIO бродкастятся во все срезы,
поэтому редьюсер обрабатывает только поля своего раздела, а чужие экшены
игнорирует (проверка наличия поля нужного типа).

Форма редьюсера совпадает с будущим `createSlice` из RTK: имя раздела,
начальное состояние и три операции над полем.
*/
export default function createSectionReducer(initialState) {
  return function sectionReducer(state = initialState, action) {
    const field = state[action.name];

    switch (action.type) {
      case "SET_SYMPTOM":
        if (!field || field.isChecked === undefined) {
          return state;
        }
        return update(state, {
          [action.name]: { isChecked: { $set: !field.isChecked } }
        });

      case "SET_TEXT":
        if (!field || field.text === undefined) {
          return state;
        }
        return update(state, {
          [action.name]: { text: { $set: action.text } }
        });

      case "SET_RADIO":
        if (!field || field.number === undefined) {
          return state;
        }
        return update(state, {
          [action.name]: { number: { $set: action.number } }
        });

      default:
        return state;
    }
  };
}
