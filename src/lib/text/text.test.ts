import { todayIso, formatDate } from "./date";
import {
  cicleKeys,
  separatorAt,
  pickPhrase,
  buildListText,
  buildRadioPhrase,
  fingerPhrase
} from "./index";

describe("todayIso / formatDate", () => {
  it("формирует сегодняшнюю дату в формате input[type=date]", () => {
    const now = new Date(2026, 10, 4);
    expect(todayIso(now)).toBe("2026-11-04");
  });

  it("переводит дату в дд.мм.гггг", () => {
    expect(formatDate("2020-05-05")).toBe("05.05.2020");
  });

  it("возвращает пустую строку для незаполненной даты", () => {
    expect(formatDate("")).toBe("");
  });

  it("возвращает исходное значение для неожиданного формата", () => {
    expect(formatDate("05.05.2020")).toBe("05.05.2020");
  });
});

describe("separatorAt", () => {
  it("не ставит разделитель после последнего пункта", () => {
    expect(separatorAt(2, 3, true)).toBe("");
  });

  it("ставит «и» перед последним пунктом при isAnd", () => {
    expect(separatorAt(1, 3, true)).toBe(" и ");
    expect(separatorAt(0, 2, true)).toBe(" и ");
  });

  it("ставит запятую, если isAnd выключен", () => {
    expect(separatorAt(1, 3, false)).toBe(", ");
  });

  it("ставит запятую, если пункт не предпоследний", () => {
    expect(separatorAt(0, 3, true)).toBe(", ");
  });

  it("не ставит «и» для единственного пункта", () => {
    expect(separatorAt(0, 1, true)).toBe("");
  });
});

describe("pickPhrase", () => {
  it("берёт женскую фразу по умолчанию", () => {
    expect(
      pickPhrase({ phrase: "Осмотрена", phraseM: "Осмотрен" }, false)
    ).toBe("Осмотрена");
  });

  it("берёт мужскую фразу, если пациент мужского пола", () => {
    expect(pickPhrase({ phrase: "Осмотрена", phraseM: "Осмотрен" }, true)).toBe(
      "Осмотрен"
    );
  });

  it("возвращает женскую фразу, если мужской вариант не задан", () => {
    expect(pickPhrase({ phrase: "Ровное" }, true)).toBe("Ровное");
  });

  it("возвращает пустую строку для отсутствующего пункта", () => {
    expect(pickPhrase(undefined, true)).toBe("");
  });
});

describe("buildListText", () => {
  const items = [
    { key: "a", phrase: "тревогу" },
    { key: "b", phrase: "плохой сон" },
    { key: "c", phrase: "слабость" }
  ];

  it("собирает вступление, пункты с разделителями и завершение", () => {
    const parts = buildListText(items, {
      isAnd: true,
      before: "Жалобы на ",
      after: ".",
      noList: "Жалоб не предъявляет."
    });

    expect(parts).toEqual([
      { key: "before", text: "Жалобы на ", separator: "" },
      { key: "a", text: "тревогу", separator: ", " },
      { key: "b", text: "плохой сон", separator: " и " },
      { key: "c", text: "слабость", separator: "" },
      { key: "after", text: ".", separator: "" }
    ]);
  });

  it("возвращает фразу «нет данных», если ничего не выбрано", () => {
    expect(buildListText([], { noList: "Жалоб не предъявляет." })).toEqual([
      { key: "noList", text: "Жалоб не предъявляет.", separator: "" }
    ]);
  });

  it("возвращает пустой список, если нет ни пунктов, ни фразы «нет данных»", () => {
    expect(buildListText([], {})).toEqual([]);
  });

  it("не добавляет пустые вступление и завершение", () => {
    const parts = buildListText([{ key: "a", phrase: "тревогу" }], {
      before: "",
      after: ""
    });

    expect(parts).toEqual([{ key: "a", text: "тревогу", separator: "" }]);
  });
});

describe("buildRadioPhrase", () => {
  const group = {
    data: [
      { id: 0, label: "ровное", phrase: "ровное" },
      { id: 1, label: "снижено", phrase: "снижено", phraseM: "снижен" }
    ],
    before: "Настроение ",
    after: "."
  };

  it("склеивает вступление, фразу и завершение", () => {
    expect(buildRadioPhrase(group, 0, false)).toBe("Настроение ровное.");
  });

  it("учитывает пол пациента", () => {
    expect(buildRadioPhrase(group, 1, true)).toBe("Настроение снижен.");
  });

  it("работает без вступления и завершения", () => {
    expect(
      buildRadioPhrase(
        { data: [{ id: 0, label: "ровное", phrase: "ровное" }] },
        0,
        false
      )
    ).toBe("ровное");
  });

  it("возвращает пустую строку для неизвестного индекса", () => {
    expect(buildRadioPhrase(group, 5, false)).toBe("");
    expect(buildRadioPhrase(undefined, 0, false)).toBe("");
  });
});

describe("cicleKeys", () => {
  const dataObj = {
    a: { cicle: "zhaloby" },
    b: { cicle: "zhaloby" },
    c: { cicle: "son" },
    d: { label: "без цикла" }
  };

  it("отбирает ключи по циклу, сохраняя порядок", () => {
    expect(cicleKeys(dataObj, "zhaloby")).toEqual(["a", "b"]);
  });

  it("возвращает пустой массив для неизвестного цикла", () => {
    expect(cicleKeys(dataObj, "нет такого")).toEqual([]);
  });
});

describe("fingerPhrase", () => {
  it("описывает фингерагнозию по числу названных пальцев", () => {
    expect(fingerPhrase(1)).toBe(
      "Фингерагнозия, называет правильно только один палец. "
    );
    expect(fingerPhrase(2)).toBe(
      "Фингерагнозия, называет правильно только 2 пальца. "
    );
    expect(fingerPhrase("3")).toBe(
      "Фингерагнозия, правильно называет 3 пальца. "
    );
    expect(fingerPhrase(4)).toBe(
      "Фингерагнозия, правильно называет 4 пальца. "
    );
    expect(fingerPhrase(5)).toBe("Фингерагнозии не выявляется. ");
  });

  it("ничего не выводит, если ответ не выбран", () => {
    expect(fingerPhrase(0)).toBe("");
    expect(fingerPhrase(undefined)).toBe("");
  });
});
