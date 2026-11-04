import type { Layout } from "../types/layout";

/* Раскладка формы раздела «Анамнез» (см. `src/components/Section`). */
export const anamnezLayout: Layout = [
  {
    type: "box",
    className: "manager",
    blocks: [
      {
        type: "title",
        className: "list__title list__title--no-top-margin",
        label: "В анамнезе:",
        labelClassName: "list__title-lable ",
        blocks: [
          { type: "field", name: "anamnezOtkl", component: "CheckboxOtkl" }
        ]
      },
      { type: "group", cicle: "anamnezCicle" }
    ]
  },
  {
    type: "field",
    name: "anamnezText",
    label: "Описание анамнеза",
    style: { minHeight: "250px" }
  }
];
