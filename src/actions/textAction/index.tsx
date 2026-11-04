/*
Совместимость импортов: компоненты берут креаторы из `actions/textAction`,
а сами экшены описаны в `actions/fieldActions` (RTK `createAction`).
*/
export { setText } from "../fieldActions";
