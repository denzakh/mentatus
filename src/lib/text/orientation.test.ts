import dataBase from "../../store/kognitData";
import type { OrientirSchemaEntry } from "../../types/schema";
import { orientationKey, orientationPhrase } from "./orientation";
import type { OrientationInput } from "./orientation";

const orientir = dataBase.orientir as OrientirSchemaEntry;

function input(overrides: Partial<OrientationInput> = {}): OrientationInput {
  return {
    notDefined: false,
    time: 1,
    place: 1,
    person: 1,
    isMale: false,
    isRechOtkl: false,
    ...overrides
  };
}

describe("orientationKey", () => {
  it("собирает код из трёх радиогрупп", () => {
    expect(orientationKey(input())).toBe("orientir111");
    expect(orientationKey(input({ time: 2, place: 3 }))).toBe("orientir231");
    expect(
      orientationKey(input({ time: 3, place: 3, person: 2 }))
    ).toBe("orientir332");
  });

  it("даёт orientir000 при «ориентировку не определить»", () => {
    expect(orientationKey(input({ notDefined: true }))).toBe("orientir000");
  });

  it("подставляет 0 для незаполненных радиогрупп", () => {
    expect(
      orientationKey(
        input({ time: undefined, place: undefined, person: undefined })
      )
    ).toBe("orientir000");
  });

  it("не зависит от пола и нарушенной речи", () => {
    expect(orientationKey(input({ isMale: true, isRechOtkl: true }))).toBe(
      "orientir111"
    );
  });
});

describe("orientationPhrase", () => {
  it("берёт фразу из таблицы для обоих полов", () => {
    expect(orientationPhrase(orientir, input())).toBe(
      orientir.w.orientir111
    );
    expect(orientationPhrase(orientir, input({ isMale: true }))).toBe(
      orientir.m.orientir111
    );
  });

  it("покрывает все 27 комбинаций для обоих полов", () => {
    [false, true].forEach(isMale => {
      const gender = isMale ? "m" : "w";

      for (let time = 1; time <= 3; time += 1) {
        for (let place = 1; place <= 3; place += 1) {
          for (let person = 1; person <= 3; person += 1) {
            const key = `orientir${time}${place}${person}`;
            const phrase = orientationPhrase(
              orientir,
              input({ time, place, person, isMale })
            );

            expect(phrase, `${gender}:${key}`).toBe(orientir[gender][key]);
            expect(phrase).not.toBe("");
          }
        }
      }
    });
  });

  it("выводит фразу «ориентировку не определить»", () => {
    expect(orientationPhrase(orientir, input({ notDefined: true }))).toBe(
      orientir.w.orientir000
    );
    expect(
      orientationPhrase(orientir, input({ notDefined: true, isMale: true }))
    ).toBe(orientir.m.orientir000);
  });

  it("возвращает пустую строку при нарушенной речи", () => {
    expect(orientationPhrase(orientir, input({ isRechOtkl: true }))).toBe("");
    expect(
      orientationPhrase(orientir, input({ isRechOtkl: true, notDefined: true }))
    ).toBe("");
  });

  it("возвращает пустую строку для неизвестной комбинации", () => {
    expect(orientationPhrase(orientir, input({ person: 5 }))).toBe("");
    // комбинации с нулём в таблице нет — остаётся фолбэк "" (как и раньше)
    expect(orientationPhrase(orientir, input({ time: 0 }))).toBe("");
  });
});
