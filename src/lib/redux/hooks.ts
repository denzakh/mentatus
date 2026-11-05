import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../../reducers";
import type { AppDispatch } from "../../configureStore";

/*
Типизированные хуки react-redux.

`connect` больше не используется: компоненты читают стор через
`useAppSelector` и меняют его через `useAppDispatch`. Типы берутся из
корневого редьюсера (`RootState`) и стора приложения (`AppDispatch`),
поэтому имя поля и форма значения проверяются TypeScript-ом.

Импорты типов — только `import type`: runtime-цикла между `configureStore`,
`reducers` и `lib/redux` не возникает.
*/

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
