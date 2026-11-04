/*
Совместимость импортов: компоненты берут креаторы из `actions/symptomAction`,
а сами экшены описаны в `actions/fieldActions` (RTK `createAction`).
*/
export { setSymptom } from "../fieldActions";
