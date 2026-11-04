import { sliceFlag } from "../lib/redux";

/* списки бреда и галлюцинаций скрываются, если врач отметил их отсутствие */
const hasBred = slice => !sliceFlag(slice, "bredOtkl");
const hasGall = slice => !sliceFlag(slice, "gallOtkl");

/* Раскладка формы раздела «Психопродукция» (см. `src/components/Section`). */
export const ppLayout = [
  {
    type: "row",
    className: "manager",
    blocks: [
      {
        type: "col",
        className: "manager__col manager__col--1",
        blocks: [
          { type: "custom", component: "Kritika" },
          {
            type: "title",
            label: "Опасные тенденции:",
            blocks: [
              { type: "field", name: "opasnyeOtkl", component: "CheckboxOtkl" }
            ]
          },
          { type: "field", name: "opasnye" },
          {
            type: "box",
            className: "no-break",
            title: "Агрессия:",
            blocks: [{ type: "field", name: "opasnyeAgressia" }]
          },
          {
            type: "box",
            className: "no-break",
            blocks: [
              {
                type: "field",
                name: "opasnyeText",
                label: "Описание опасных тенденций"
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
            blocks: [
              {
                type: "title",
                label: "Бред:",
                blocks: [
                  { type: "field", name: "bredOtkl", component: "CheckboxOtkl" }
                ]
              },
              {
                type: "group",
                cicle: "bred",
                autoKritika: 3,
                visibleWhen: hasBred
              }
            ]
          },
          {
            type: "box",
            className: "no-break",
            blocks: [
              { type: "field", name: "bredText", label: "Описание бреда" }
            ]
          },
          {
            type: "box",
            className: "no-break",
            blocks: [
              {
                type: "title",
                label: "Галлюцинации:",
                blocks: [
                  { type: "field", name: "gallOtkl", component: "CheckboxOtkl" }
                ]
              },
              {
                type: "group",
                cicle: "gall",
                autoKritika: 3,
                visibleWhen: hasGall
              }
            ]
          },
          {
            type: "box",
            className: "no-break",
            blocks: [
              {
                type: "field",
                name: "gallText",
                label: "Описание галлюцинаций"
              }
            ]
          }
        ]
      }
    ]
  }
];
