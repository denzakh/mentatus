import type { Layout } from "../types/layout";

/* Раскладка формы раздела «Интеллект и память» (см. `src/components/Section`). */
export const kognitLayout: Layout = [
  {
    type: "row",
    className: "manager",
    blocks: [
      {
        type: "box",
        className: "manager__orientir",
        blocks: [{ type: "custom", component: "Orientirovka" }]
      },
      {
        type: "col",
        className: "manager__col manager__col--1",
        blocks: [
          {
            type: "box",
            className: "no-break",
            title: "Интеллектуально-мнестические функции:",
            blocks: [
              {
                type: "field",
                name: "kognitOsnivnoi",
                component: "RadioListKogn"
              }
            ]
          }
        ]
      },
      {
        type: "col",
        className: "manager__col manager__col--1",
        blocks: [
          {
            type: "box",
            className: "no-break",
            title: "отмечается: ",
            blocks: [{ type: "group", cicle: "otmech" }]
          },
          {
            type: "box",
            className: "no-break",
            title: "отдельно: ",
            blocks: [
              {
                type: "group",
                cicle: "otdel",
                itemClassName: "list__item list__item--no-group"
              }
            ]
          },
          {
            type: "box",
            className: "list__box",
            blocks: [
              {
                type: "field",
                name: "kognitFingerN",
                component: "RadioListInline"
              }
            ]
          }
        ]
      }
    ]
  }
];
