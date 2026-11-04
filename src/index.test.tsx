import { act, waitFor } from "@testing-library/react";

/*
Smoke-тест entry-точки: приложение монтируется в #root через `createRoot`
и рендерит каркас (header + активная страница). Проверяет, что React 18,
react-redux 9 и redux-persist работают вместе.
*/
describe("index", () => {
  it("монтирует приложение в #root", async () => {
    document.body.innerHTML = '<div id="root"></div>';

    await act(async () => {
      await import("./index");
    });

    await waitFor(() => {
      expect(document.querySelector(".wrapper")).not.toBeNull();
      expect(document.querySelector(".wrapper__header")).not.toBeNull();
      expect(document.querySelector(".wrapper__main")).not.toBeNull();
    });
  });
});
