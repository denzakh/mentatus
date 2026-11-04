import rechData from "./rechData.js";
import { sliceFlag } from "../lib/redux";

/* Раскладка формы раздела «Общее состояние» (см. `src/components/Section`).
   Блоки речи берут схему раздела «Речь». */
export const sostoyanieLayout = [
  {
    type: "row",
    className: "manager",
    blocks: [
      {
        type: "col",
        className: "manager__col manager__col--1",
        blocks: [
          { type: "custom", component: "Nachalo" },
          {
            type: "box",
            className: "no-break",
            title: "Состояние сознания:",
            blocks: [{ type: "field", name: "soznanie" }]
          }
        ]
      },
      {
        type: "col",
        className: "manager__col manager__col--2",
        blocks: [
          {
            type: "box",
            className: "no-break",
            blocks: [
              {
                type: "box",
                className: "list__wrap",
                blocks: [
                  {
                    type: "title",
                    label: "Речь:",
                    blocks: [
                      {
                        type: "field",
                        name: "rechOtkl",
                        component: "CheckboxOtkl",
                        dataBase: rechData
                      },
                      {
                        type: "field",
                        name: "rechNeotvechaet",
                        component: "CheckboxOtkl",
                        dataBase: rechData
                      }
                    ]
                  },
                  { type: "group", cicle: "rechGrub", dataBase: rechData }
                ]
              }
            ]
          },
          {
            type: "box",
            className: "no-break",
            title: "Контакт:",
            blocks: [
              { type: "field", name: "kontakt" },
              {
                type: "box",
                className: "list__add",
                blocks: [{ type: "field", name: "kontaktZatrudnen" }]
              }
            ]
          },
          {
            type: "box",
            className: "no-break",
            blocks: [
              {
                type: "box",
                visibleWhen: slice => sliceFlag(slice, "kontaktZatrudnen"),
                blocks: [
                  { type: "title", text: "затруднен из-за: " },
                  { type: "group", cicle: "zatrud" }
                ]
              }
            ]
          },
          {
            type: "box",
            className: "no-break",
            blocks: [
              {
                type: "box",
                blocks: [
                  { type: "title", text: "Впечатление: " },
                  { type: "group", cicle: "vpech" }
                ]
              }
            ]
          },
          { type: "title", text: "Дополнение: " },
          { type: "field", name: "sostoyanieText", label: "" }
        ]
      }
    ]
  }
];
