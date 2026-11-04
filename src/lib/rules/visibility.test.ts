import {
  CONTACT_UNAVAILABLE,
  CONSCIOUSNESS_CLOUDED,
  isContactUnavailable,
  isConsciousnessClouded,
  isDescriptiveHidden,
  isZhalobyHidden,
  isRechMainHidden
} from "./visibility";
import type { VisibilityFields } from "./visibility";

describe("видимость описательной части", () => {
  it("фиксирует номера пунктов радиогрупп", () => {
    expect(CONTACT_UNAVAILABLE).toBe(2);
    expect(CONSCIOUSNESS_CLOUDED).toBe(7);
  });

  describe("isContactUnavailable", () => {
    it("истинно для пункта «контакт недоступен»", () => {
      expect(isContactUnavailable(CONTACT_UNAVAILABLE)).toBe(true);
    });

    it("ложно для соседних пунктов", () => {
      [0, 1, 3, 4].forEach(kontakt => {
        expect(isContactUnavailable(kontakt)).toBe(false);
      });
    });

    it("ложно для незаполненного поля", () => {
      expect(isContactUnavailable(undefined)).toBe(false);
    });

    it("понимает номер, пришедший строкой", () => {
      expect(isContactUnavailable("2" as unknown as number)).toBe(true);
    });
  });

  describe("isConsciousnessClouded", () => {
    it("истинно для пункта «помрачено»", () => {
      expect(isConsciousnessClouded(CONSCIOUSNESS_CLOUDED)).toBe(true);
    });

    it("ложно для соседних пунктов", () => {
      [0, 6, 8].forEach(soznanie => {
        expect(isConsciousnessClouded(soznanie)).toBe(false);
      });
    });

    it("ложно для незаполненного поля", () => {
      expect(isConsciousnessClouded(undefined)).toBe(false);
    });
  });

  describe("isDescriptiveHidden", () => {
    it("скрывает при недоступном контакте", () => {
      expect(isDescriptiveHidden({ kontakt: 2 })).toBe(true);
    });

    it("скрывает при помрачённом сознании", () => {
      expect(isDescriptiveHidden({ soznanie: 7 })).toBe(true);
    });

    it("скрывает, если совпало и то и другое", () => {
      expect(isDescriptiveHidden({ kontakt: 2, soznanie: 7 })).toBe(true);
    });

    it("не скрывает при пустых и граничных значениях", () => {
      const cases: VisibilityFields[] = [
        {},
        { kontakt: 1 },
        { kontakt: 3 },
        { soznanie: 6 },
        { soznanie: 8 },
        { kontakt: 1, soznanie: 6 }
      ];

      cases.forEach(fields => {
        expect(isDescriptiveHidden(fields)).toBe(false);
      });
    });

    it("не зависит от нарушенной речи", () => {
      expect(isDescriptiveHidden({ rechOtkl: true })).toBe(false);
      expect(isDescriptiveHidden({ rechNeotvechaet: true })).toBe(false);
    });
  });

  describe("isZhalobyHidden", () => {
    it("скрывает при нарушенной речи", () => {
      expect(isZhalobyHidden({ rechOtkl: true })).toBe(true);
    });

    it("скрывает, если пациент не отвечает", () => {
      expect(isZhalobyHidden({ rechNeotvechaet: true })).toBe(true);
    });

    it("скрывает при недоступном контакте и помрачённом сознании", () => {
      expect(isZhalobyHidden({ kontakt: 2 })).toBe(true);
      expect(isZhalobyHidden({ soznanie: 7 })).toBe(true);
    });

    it("не скрывает при пустых значениях", () => {
      expect(isZhalobyHidden({})).toBe(false);
      expect(isZhalobyHidden({ kontakt: 1, soznanie: 6 })).toBe(false);
    });
  });

  describe("isRechMainHidden", () => {
    it("скрывает при нарушенной речи", () => {
      expect(isRechMainHidden({ rechOtkl: true })).toBe(true);
    });

    it("скрывает при недоступном контакте и помрачённом сознании", () => {
      expect(isRechMainHidden({ kontakt: 2 })).toBe(true);
      expect(isRechMainHidden({ soznanie: 7 })).toBe(true);
    });

    it("не скрывает, если пациент только не отвечает", () => {
      expect(isRechMainHidden({ rechNeotvechaet: true })).toBe(false);
    });

    it("не скрывает при пустых значениях", () => {
      expect(isRechMainHidden({})).toBe(false);
      expect(isRechMainHidden({ kontakt: 1, soznanie: 6 })).toBe(false);
    });
  });
});
