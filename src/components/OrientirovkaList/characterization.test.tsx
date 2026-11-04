import { setRadio, setSymptom, setText } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus,
  type StatusStore
} from "../../testUtils/statusStore";
import type { StatusState } from "../../types/status";
import OrientirovkaList from "./index";

/*
Характеризационные тесты фразы ориентировки.

Снимают дословный вывод компонента до переноса выбора фразы в
`src/lib/text/orientation`: пол, код ориентировки, «ориентировку не
определить», нарушенная речь и свободный текст. После переноса вывод
должен остаться байт в байт.
*/

function orientationText(
  configure?: (store: StatusStore) => void,
  overrides?: Partial<StatusState>
): string {
  const store = createStatusStore(overrides);

  if (configure) {
    configure(store);
  }

  const { container } = renderWithStatus(<OrientirovkaList />, store);
  return container.textContent || "";
}

describe("OrientirovkaList — характеризация текста", () => {
  it("фиксирует все варианты фразы ориентировки", () => {
    const outputs: Record<string, string> = {};

    outputs["женщина, 111"] = orientationText();

    outputs["мужчина, 111"] = orientationText(store => {
      store.dispatch(setSymptom("pol"));
    });

    outputs["женщина, 231"] = orientationText(store => {
      store.dispatch(setRadio("orientirVremia", 2));
      store.dispatch(setRadio("orientirMesto", 3));
    });

    outputs["мужчина, 332"] = orientationText(store => {
      store.dispatch(setSymptom("pol"));
      store.dispatch(setRadio("orientirVremia", 3));
      store.dispatch(setRadio("orientirMesto", 3));
      store.dispatch(setRadio("orientirLichnost", 2));
    });

    outputs["женщина, ориентировку не определить"] = orientationText(store => {
      store.dispatch(setSymptom("orientirNot"));
    });

    outputs["мужчина, ориентировку не определить"] = orientationText(store => {
      store.dispatch(setSymptom("pol"));
      store.dispatch(setSymptom("orientirNot"));
    });

    outputs["неизвестная комбинация"] = orientationText(store => {
      store.dispatch(setRadio("orientirLichnost", 5));
    });

    outputs["нарушена речь"] = orientationText(store => {
      store.dispatch(setSymptom("rechOtkl"));
    });

    outputs["свободный текст"] = orientationText(store => {
      store.dispatch(setText("orientirText", "Своя фраза."));
    });

    expect(outputs).toMatchInlineSnapshot(`
      {
        "женщина, 111": "В месте, времени и собственной личности ориентирована верно.  ",
        "женщина, 231": "Дезориентирована в месте, частично ориентирована во времени, в собственной личности ориентирована верно.  ",
        "женщина, ориентировку не определить": "Степень ориентировки определить не удается.  ",
        "мужчина, 111": "В месте, времени и собственной личности ориентирован верно.  ",
        "мужчина, 332": "Дезориентирован во времени и месте, в собственной личности ориентирован частично.  ",
        "мужчина, ориентировку не определить": "Степень ориентировки определить не удается.  ",
        "нарушена речь": "  ",
        "неизвестная комбинация": "  ",
        "свободный текст": "В месте, времени и собственной личности ориентирована верно. Своя фраза. ",
      }
    `);
  });
});
