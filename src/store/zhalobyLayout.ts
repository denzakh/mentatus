import type { Layout } from "../types/layout";

/* Раскладка формы раздела «Жалобы» (см. `src/components/Section`). */
export const zhalobyLayout: Layout = [
  {
    type: "box",
    className: "manager",
    blocks: [
      {
        type: "title",
        className: "list__title list__title--no-top-margin",
        text: "Жалобы на:"
      },
      { type: "group", cicle: "zhalobyCicle" }
    ]
  },
  { type: "field", name: "zhalobyText", label: "Описание жалоб" }
];
