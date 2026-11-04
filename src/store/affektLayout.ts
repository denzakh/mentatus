import type { Layout } from "../types/layout";

import { sliceFlag, sliceNumber } from "../lib/redux";

/* подробности колебаний настроения нужны только при их наличии */
const hasKolebania = slice => sliceFlag(slice, "nastroyeniyeKolebania");

/* блок «в связи с / с проявлениями / дополнительно» не нужен
   для «ровного» и «не определить» */
const hasNastroyeniyeOptions = slice =>
  sliceNumber(slice, "nastroyeniye") !== 0 &&
  sliceNumber(slice, "nastroyeniye") !== 7;

const hasTrevogaOptions = slice => sliceNumber(slice, "trevoga") !== 0;

const hasAppetitOptions = slice => sliceNumber(slice, "appetit") !== 0;

/* Раскладка формы раздела «Аффект» (см. `src/components/Section`). */
export const affektLayout: Layout = [
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
            text: "Настроение:"
          },
          { type: "field", name: "nastroyeniye" },
          {
            type: "box",
            className: "list__options",
            visibleWhen: hasNastroyeniyeOptions,
            blocks: [
              {
                type: "box",
                className: "no-break",
                title: "в связи с: ",
                blocks: [
                  {
                    type: "group",
                    cicle: "vSvyazi",
                    itemClassName: "list__item list__item--no-group"
                  }
                ]
              },
              {
                type: "box",
                className: "break",
                title: "с проявлениями: ",
                blocks: [
                  { type: "group", cicle: "s" },
                  {
                    type: "box",
                    className: "list__second",
                    visibleWhen: hasKolebania,
                    blocks: [
                      { type: "field", name: "nastroyeniyeKolebaniaPodrobno" },
                      { type: "br" }
                    ]
                  }
                ]
              },
              {
                type: "box",
                className: "no-break",
                title: "дополнительно: ",
                blocks: [{ type: "group", cicle: "nastroyenieSeparate" }]
              }
            ]
          },
          {
            type: "box",
            className: "no-break",
            blocks: [
              {
                type: "field",
                name: "nastroyeniyeText",
                label: "Описание настроения"
              }
            ]
          },
          {
            type: "box",
            className: "no-break",
            title: "Тревога: ",
            blocks: [{ type: "field", name: "trevoga" }]
          },
          {
            type: "box",
            className: "no-break",
            blocks: [
              {
                type: "box",
                visibleWhen: hasTrevogaOptions,
                blocks: [
                  { type: "br" },
                  {
                    type: "box",
                    className: "list__options",
                    blocks: [{ type: "group", cicle: "trevogaSeparate" }]
                  },
                  {
                    type: "field",
                    name: "trevogaText",
                    label: "Описание тревоги"
                  }
                ]
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
            title: "Сон: ",
            blocks: [{ type: "group", cicle: "son" }]
          },
          {
            type: "box",
            className: "list__box",
            blocks: [{ type: "group", cicle: "sonSeparate" }]
          },
          {
            type: "box",
            className: "no-break",
            blocks: [{ type: "field", name: "sonText", label: "Описание сна" }]
          },
          {
            type: "box",
            className: "no-break",
            title: "Аппетит:",
            blocks: [{ type: "field", name: "appetit" }]
          },
          {
            type: "box",
            className: "no-break",
            blocks: [
              {
                type: "box",
                className: "list__options",
                visibleWhen: hasAppetitOptions,
                blocks: [
                  {
                    type: "field",
                    name: "appetitPohudel",
                    component: "TextareaInline",
                    label: "Похудел на (кг)"
                  },
                  {
                    type: "field",
                    name: "appetitText",
                    label: "Описание аппетита"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
