import type { ReactElement } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import rootReducer from "../reducers";
import type { RootState } from "../reducers";
import type { StatusState } from "../types/status";

/*
Тестовые утилиты для проверок разметки: настоящий стор без персиста и
обёртка `Provider`.

Стор собирается тем же корневым редьюсером, что и приложение, поэтому
компоненты видят реальную форму полей. `overrides` заменяет срез целиком —
так задаются «пустые» значения, которые экшены выставить не могут.
*/

export function createStatusStore(overrides: Partial<StatusState> = {}) {
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
