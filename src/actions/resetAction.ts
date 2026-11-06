import { createAction } from "@reduxjs/toolkit";

/*
Сброс всего состояния к начальным значениями всех срезов.
Диспатчится кнопкой «Сбросить» в App. После сброса persistor
сам перезапишет `persist:mentatus` в localStorage (throttle 300 мс).
*/
export const resetState = createAction("RESET_STATE");
