import type { ComponentType } from "react";
import type { ListOwnProps } from "../types/components";
import type { Layout } from "../types/layout";
import type { Schema } from "../types/schema";
import type { SectionName } from "../types/status";

import sostoyanieData from "../store/sostoyanieData";
import anamnezData from "../store/anamnezData";
import zhalobyData from "../store/zhalobyData";
import affektData from "../store/affektData";
import rechData from "../store/rechData";
import kognitData from "../store/kognitData";
import ppData from "../store/ppData";
import diagnozData from "../store/diagnozData";

import { sostoyanieLayout } from "../store/sostoyanieLayout";
import { anamnezLayout } from "../store/anamnezLayout";
import { zhalobyLayout } from "../store/zhalobyLayout";
import { affektLayout } from "../store/affektLayout";
import { rechLayout } from "../store/rechLayout";
import { kognitLayout } from "../store/kognitLayout";
import { ppLayout } from "../store/ppLayout";

import NachaloManager from "../components/NachaloManager";
import OrientirovkaManager from "../components/OrientirovkaManager";
import KritikaManager from "../components/KritikaManager";
import DiagnozManager from "../components/DiagnozManager";

import AnamnezList from "../components/AnamnezList";
import SostoyanieList from "../components/SostoyanieList";
import ZhalobyList from "../components/ZhalobyList";
import OrientirovkaList from "../components/OrientirovkaList";
import AffektList from "../components/AffektList";
import RechList from "../components/RechList";
import KognitList from "../components/KognitList";
import PpList from "../components/PpList";
import DiagnozList from "../components/DiagnozList";

/*
Единый реестр разделов — единственное место, где перечислены разделы.

До рефакторинга список разделов был размазан по пяти файлам: `TabMenu`
(вкладки), `TabRender` (формы), `Conclusion` (абзацы заключения),
`store/schemas.ts` (схемы) и `reducers/sections.ts` (срезы). Теперь порядок
вкладок задаёт `tabOrder`, порядок абзацев заключения — `conclusionOrder`,
а схема, layout, custom-блоки и форма раздела лежат в одной записи.

Добавление раздела = запись здесь + схема (`store/*Data.ts`) + срез
(`store/*Store.ts`) и регистрация среза в `reducers/sections.ts`;
UI-компоненты (`TabMenu`, `TabRender`, `Conclusion`) править не нужно.

Направление импортов — только «реестр → компоненты/стор». Обратных импортов
из `store`, `reducers` и `lib` быть не должно, иначе получится цикл
`registry → components → store → registry`.
*/

export interface SectionEntry {
  name: SectionName;
  // вкладка: символ и подпись; порядок задаёт tabOrder
  tab: { symbol: string; title: string };
  schema: Schema;
  layout?: Layout; // нет у diagnoz — у него собственная форма
  custom?: Record<string, ComponentType<{ dataBase?: Schema }>>;
  // "section" — рендерить <Section> из schema/layout/custom,
  // иначе — собственная форма (DiagnozManager)
  form: "section" | ComponentType;
}

export const sectionsRegistry: Record<SectionName, SectionEntry> = {
  sostoyanie: {
    name: "sostoyanie",
    tab: { symbol: "ОC", title: "Общее состояние" },
    schema: sostoyanieData,
    layout: sostoyanieLayout,
    custom: { Nachalo: NachaloManager },
    form: "section"
  },
  anamnez: {
    name: "anamnez",
    tab: { symbol: "АH", title: "Анамнез" },
    schema: anamnezData,
    layout: anamnezLayout,
    form: "section"
  },
  zhaloby: {
    name: "zhaloby",
    tab: { symbol: "ЖЛ", title: "Жалобы" },
    schema: zhalobyData,
    layout: zhalobyLayout,
    form: "section"
  },
  affekt: {
    name: "affekt",
    tab: { symbol: "АФ", title: "Аффективная сфера" },
    schema: affektData,
    layout: affektLayout,
    form: "section"
  },
  rech: {
    name: "rech",
    tab: { symbol: "РМ", title: "Речь и мышление" },
    schema: rechData,
    layout: rechLayout,
    form: "section"
  },
  kognit: {
    name: "kognit",
    tab: { symbol: "ИП", title: "Интеллект и память" },
    schema: kognitData,
    layout: kognitLayout,
    custom: { Orientirovka: OrientirovkaManager },
    form: "section"
  },
  pp: {
    name: "pp",
    tab: { symbol: "ПП", title: "Психопродукция" },
    schema: ppData,
    layout: ppLayout,
    custom: { Kritika: KritikaManager },
    form: "section"
  },
  diagnoz: {
    name: "diagnoz",
    tab: { symbol: "ДЗ", title: "Диагноз" },
    schema: diagnozData,
    form: DiagnozManager
  }
};

// порядок вкладок в меню разделов (как в TabMenu до рефакторинга)
export const tabOrder: SectionName[] = [
  "sostoyanie",
  "anamnez",
  "zhaloby",
  "affekt",
  "rech",
  "kognit",
  "pp",
  "diagnoz"
];

/*
Порядок и группировка заключения.

`paragraph`: 2 — второй абзац (описательная часть), 3 — блок после абзацев
(диагноз; `DiagnozList` рендерит свой <div>, поэтому <p> ему не нужен).
Первый абзац — «Начало осмотра» (`NachaloList`), он подключается в
`Conclusion` отдельным элементом. `hiddenWhenDescriptive` — элемент
скрывается вместе с описательной частью при `kontakt = 2` или `soznanie = 7`.

`kognit` встречается дважды: «Ориентировка» выводится до «Аффекта», а
`KognitList` — после «Речи». Это текущий порядок UI, менять его нельзя.
*/
export interface ConclusionItem {
  section: SectionName;
  List: ComponentType<ListOwnProps>;
  paragraph: 1 | 2 | 3; // в какой <p> выводится
  hiddenWhenDescriptive?: boolean; // скрывается вместе при isDescriptiveHidden
}

export const conclusionOrder: ConclusionItem[] = [
  { section: "anamnez", List: AnamnezList, paragraph: 2 },
  { section: "sostoyanie", List: SostoyanieList, paragraph: 2 },
  {
    section: "zhaloby",
    List: ZhalobyList,
    paragraph: 2,
    hiddenWhenDescriptive: true
  },
  {
    section: "kognit",
    List: OrientirovkaList,
    paragraph: 2,
    hiddenWhenDescriptive: true
  },
  {
    section: "affekt",
    List: AffektList,
    paragraph: 2,
    hiddenWhenDescriptive: true
  },
  {
    section: "rech",
    List: RechList,
    paragraph: 2,
    hiddenWhenDescriptive: true
  },
  {
    section: "kognit",
    List: KognitList,
    paragraph: 2,
    hiddenWhenDescriptive: true
  },
  { section: "pp", List: PpList, paragraph: 2, hiddenWhenDescriptive: true },
  { section: "diagnoz", List: DiagnozList, paragraph: 3 }
];
