import { createSlice } from "@reduxjs/toolkit";
import { setSymptom, setText, setRadio } from "../actions/fieldActions";

/*
Фабрика среза раздела.

Экшены SET_SYMPTOM / SET_TEXT / SET_RADIO бродкастятся во все срезы,
поэтому редьюсер обрабатывает только поля своего раздела, а чужие экшены
игнорирует (проверка наличия поля нужного типа). Immer из RTK при этом
возвращает тот же объект состояния, а не новую копию.

Форма среза совпадает с прежней фабрикой редьюсера (см. историю
`createSectionReducer.js`): имя раздела, начальное состояние и три операции
над полем.
*/
export default function createSectionSlice(name, initialState) {
  return createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(setSymptom, (state, action) => {
          const field = state[action.payload.name];
          if (field && field.isChecked !== undefined) {
            field.isChecked = !field.isChecked;
          }
        })
        .addCase(setText, (state, action) => {
          const field = state[action.payload.name];
          if (field && field.text !== undefined) {
            field.text = action.payload.text;
          }
        })
        .addCase(setRadio, (state, action) => {
          const field = state[action.payload.name];
          if (field && field.number !== undefined) {
            field.number = action.payload.number;
          }
        });
    }
  });
}
