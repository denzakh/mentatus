import sections from "../reducers/sections";
import { sectionsRegistry } from "../sections/registry";
import type { FieldType, OrientirSchemaEntry, Schema } from "../types/schema";
import type { SectionName, StatusSection } from "../types/status";

/*
Полнота схем разделов: `*Data.js` — единственный источник правды о полях.
Типы: boolean (чекбокс), radio (радиогруппа), string | text (свободный текст,
в этой кодовой базе равнозначны), number (число без ввода, например patientId).
*/

const TYPES = ["boolean", "radio", "string", "text", "number"] as const;

// тип поля может отсутствовать у служебных записей схемы
function isKnownType(type?: FieldType): boolean {
  return !!type && TYPES.some(item => item === type);
}

// служебные фразы обрамления списков: не поля стора, а части заключения
const SERVICE_SUFFIXES = ["Before", "After", "Not"];

// не поле стора, а таблица фраз ориентировки (см. `OrientirovkaList`)
const NON_FIELD_KEYS = ["orientir"];

function isServicePhrase(key: string) {
  return SERVICE_SUFFIXES.some(
    suffix => key.slice(key.length - suffix.length) === suffix
  );
}

// форма поля стора, ожидаемая для типа схемы
function storeKeyByType(type?: FieldType) {
  switch (type) {
    case "boolean":
      return "isChecked";
    case "radio":
    case "number":
      return "number";
    case "string":
    case "text":
      return "text";
    default:
      return null;
  }
}

/* Схемы берутся из реестра разделов — единственного места, где они
   перечислены (`src/sections/registry.ts`). */
const schemas = Object.fromEntries(
  Object.entries(sectionsRegistry).map(([name, entry]) => [name, entry.schema])
) as Record<SectionName, Schema>;

describe("схемы разделов", () => {
  it("содержит схему для каждого среза", () => {
    expect(Object.keys(schemas).sort()).toEqual(Object.keys(sections).sort());
  });

  (Object.keys(sections) as SectionName[]).forEach(section => {
    describe(section, () => {
      const store = sections[section] as StatusSection;
      const schema = schemas[section];

      it("описывает каждое поле стора разделом и типом", () => {
        Object.keys(store).forEach(field => {
          const description = schema[field];

          expect(description).toBeDefined();
          expect(description.section).toBe(section);
          expect(isKnownType(description.type)).toBe(true);
        });
      });

      it("совпадает с формой поля в сторе", () => {
        Object.keys(store).forEach(field => {
          const storeKey = storeKeyByType(schema[field].type);

          expect(Object.keys(store[field])).toEqual([storeKey]);
        });
      });

      it("не содержит полей других разделов и лишних записей", () => {
        Object.keys(schema).forEach(key => {
          const isField = !!store[key];
          const known = NON_FIELD_KEYS.indexOf(key) !== -1;

          expect(isField || known || isServicePhrase(key)).toBe(true);

          if (!known) {
            expect(schema[key].section).toBe(section);
            expect(isKnownType(schema[key].type)).toBe(true);
          }
        });
      });

      it("описывает служебные фразы с текстом", () => {
        Object.keys(schema).forEach(key => {
          if (isServicePhrase(key)) {
            expect(typeof schema[key].phrase).toBe("string");
          }
        });
      });

      it("описывает радиогруппы с непустым списком пунктов", () => {
        Object.keys(store).forEach(field => {
          const description = schema[field];

          if (description.type !== "radio") {
            return;
          }

          const options = description.data || [];

          expect(Array.isArray(description.data)).toBe(true);
          expect(options.length).toBeGreaterThan(0);

          options.forEach(item => {
            expect(typeof item.id).toBe("number");
            expect(typeof item.label).toBe("string");
            expect(typeof item.phrase).toBe("string");
          });
        });
      });
    });
  });

  it("описывает все комбинации фраз ориентировки", () => {
    const orientir = schemas.kognit.orientir as OrientirSchemaEntry;

    (["w", "m"] as const).forEach(gender => {
      expect(typeof orientir[gender].orientir000).toBe("string");

      for (let time = 1; time <= 3; time += 1) {
        for (let place = 1; place <= 3; place += 1) {
          for (let person = 1; person <= 3; person += 1) {
            const key = `orientir${time}${place}${person}`;

            expect(typeof orientir[gender][key], `${gender}:${key}`).toBe(
              "string"
            );
          }
        }
      }
    });
  });
});
