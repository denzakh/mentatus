import type { ReactElement } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import rootReducer from "../reducers";
import type { RootState } from "../reducers";
import type { SectionName } from "../types/status";

/*
Тестовые утилиты для проверок разметки: настоящий стор без персиста и
обёртка `Provider`.

Стор собирается тем же корневным редьюсером, что и приложение, поэтому
компоненты видят реальную форму полей. `overrides` заменяет срез целиком —
так задаются «пустые» значения, которые экшены выставить не могут
(например, радиогруппа `{ number: undefined }`). Поэтому значения полей
в надстройке не сужаются до стартовых типов среза.
*/

export type StatusOverrides = Partial<
  Record<SectionName, Record<string, unknown>>
>;

export function createStatusStore(overrides: StatusOverrides = {}) {
  const initial = rootReducer(undefined, { type: "@@INIT" });

  return configureStore({
    reducer: rootReducer,
    preloadedState: { ...initial, ...overrides } as RootState
  });
}

export type StatusStore = ReturnType<typeof createStatusStore>;

export function renderWithStatus(ui: ReactElement, store: StatusStore) {
  return render(<Provider store={store}>{ui}</Provider>);
}
