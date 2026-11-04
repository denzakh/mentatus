import React, { Component } from "react";
import Section from "../../components/Section";
import { sectionsRegistry } from "../../sections/registry";
import type { SectionEntry } from "../../sections/registry";
import type { SectionName } from "../../types/status";

/*
TabRender
показывает форму активного раздела

принимает:
activeTab - имя активного раздела

Форма берётся из реестра разделов (`src/sections/registry.ts`):
`form: "section"` — декларативная форма `<Section>` (схема + layout +
custom-блоки), иначе — собственная форма раздела (`DiagnozManager`).

Данные разделы берут из стора сами, поэтому перерисовка
при вводе затрагивает только конкретное поле.
*/

interface Props {
  activeTab: string;
}

export default class TabRender extends Component<Props> {
  render() {
    const entry = sectionsRegistry[this.props.activeTab as SectionName];

    return (
      <div className="tab-render">
        {entry ? this.renderForm(entry) : null}
      </div>
    );
  }

  renderForm(entry: SectionEntry) {
    if (entry.form === "section") {
      return (
        <div key={entry.name}>
          <Section
            section={entry.name}
            dataBase={entry.schema}
            layout={entry.layout}
            components={entry.custom}
          />
        </div>
      );
    }

    const Form = entry.form;

    return (
      <div key={entry.name}>
        <Form />
      </div>
    );
  }
}
