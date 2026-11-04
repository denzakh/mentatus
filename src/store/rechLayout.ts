import { sliceFlag } from "../lib/redux";

/* при грубых нарушениях речи основная часть не выводится */
const hasRechMain = slice => !sliceFlag(slice, "rechOtkl");

/* варианты ответов не нужны, если пациент не отвечает */
const hasOtvety = slice => !sliceFlag(slice, "rechNeotvechaet");

/* Раскладка формы раздела «Речь и мышление» (см. `src/components/Section`). */
export const rechLayout = [
  {
    type: "row",
    className: "manager",
    blocks: [
      {
        type: "col",
        className: "manager__col manager__col--1",
        blocks: [
          {
            type: "title",
            className: "list__title list__title--no-top-margin",
            text: "Мышление:"
          },
          { type: "field", name: "myshleniePosled" },
          { type: "title", text: "по темпу:" },
          { type: "field", name: "myshlenieTemp" },
          {
            type: "box",
            className: "no-break",
            blocks: [
              {
                type: "box",
                className: "list__box",
                blocks: [{ type: "group", cicle: "myshlenie" }]
              }
            ]
          },
          {
            type: "box",
            className: "no-break",
            blocks: [
              {
                type: "field",
                name: "myshlenieText",
                label: "Описание мышления"
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
                label: "Речь:",
                blocks: [
                  { type: "field", name: "rechOtkl", component: "CheckboxOtkl" }
                ]
              },
              {
                type: "box",
                className: "list__box",
                visibleWhen: hasRechMain,
                blocks: [
                  {
                    type: "box",
                    className: "list__box",
                    blocks: [{ type: "group", cicle: "rechOsob" }]
                  },
                  {
                    type: "title",
                    text: "ответы:",
                    blocks: [
                      {
                        type: "field",
                        name: "rechNeotvechaet",
                        component: "CheckboxOtkl"
                      }
                    ]
                  },
                  {
                    type: "box",
                    visibleWhen: hasOtvety,
                    blocks: [
                      { type: "field", name: "rechSuschestvo" },
                      {
                        type: "box",
                        className: "list__add",
                        blocks: [{ type: "field", name: "rechOdnosloj" }]
                      }
                    ]
                  },
                  {
                    type: "box",
                    className: "list__box",
                    blocks: [{ type: "group", cicle: "rechOtmech" }]
                  }
                ]
              }
            ]
          },
          { type: "title", text: "грубые нарушения:" },
          {
            type: "box",
            className: "list__wrap",
            blocks: [{ type: "group", cicle: "rechGrub" }]
          },
          { type: "field", name: "rechText", label: "Описание речи" }
        ]
      }
    ]
  }
];
