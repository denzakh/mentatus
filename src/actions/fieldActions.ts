import { createAction } from "@reduxjs/toolkit";

/*
Экшены полей, общие для всех срезов разделов.

Тип экшена остаётся глобальным (SET_SYMPTOM / SET_TEXT / SET_RADIO), поэтому
диспатч в generic-компонентах не меняется. Данные RTK кладёт в `payload`:
срезы (`createSectionSlice`) читают их оттуда.
*/

export const setSymptom = createAction("SET_SYMPTOM", (name: string) => ({
  payload: { name }
}));

export const setText = createAction(
  "SET_TEXT",
  (name: string, text: string) => ({
    payload: { name, text }
  })
);

export const setRadio = createAction(
  "SET_RADIO",
  (name: string, number: number) => ({
    payload: { name, number }
  })
);
