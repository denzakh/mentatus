import { createSlice } from "@reduxjs/toolkit";
import { setSymptom, setText, setRadio } from "../actions/fieldActions";
import type { StatusSection } from "../types/status";
import {
  isCheckboxField,
  isRadioField,
  isTextField
} from "../types/status";

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

export default function createSectionSlice<S extends StatusSection>(
  name: string,
  initialState: S
) {
  return createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(setSymptom, (state, action) => {
          // индексация по имени поля: драфт сужается до общего типа среза
          const field = (state as StatusSection)[action.payload.name];
          if (isCheckboxField(field)) {
            field.isChecked = !field.isChecked;
          }
        })
        .addCase(setText, (state, action) => {
          const field = (state as StatusSection)[action.payload.name];
          if (isTextField(field)) {
            field.text = action.payload.text;
          }
        })
        .addCase(setRadio, (state, action) => {
          const field = (state as StatusSection)[action.payload.name];
          if (isRadioField(field)) {
            field.number = action.payload.number;
          }
        });
    }
  });
}
