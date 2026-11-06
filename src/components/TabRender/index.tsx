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

export default function TabRender(props: Props) {
  const entry = sectionsRegistry[props.activeTab as SectionName];

  return <div className="tab-render">{entry ? renderForm(entry) : null}</div>;
}

function renderForm(entry: SectionEntry) {
  const Header = () => <div className="app__tab-title">{entry.tab.title}</div>;

  if (entry.form === "section") {
    const layout = entry.layout;
    if (!layout) {
      return null;
    }
    return (
      <div key={entry.name}>
        <Header />
        <Section
          section={entry.name}
          dataBase={entry.schema}
          layout={layout}
          components={entry.custom}
        />
      </div>
    );
  }

  const Form = entry.form;

  return (
    <div key={entry.name}>
      <Header />
      <Form />
    </div>
  );
}
