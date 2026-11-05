
import { fieldOf, useAppSelector } from "../../lib/redux";
import { isDescriptiveHidden } from "../../lib/rules/visibility";
import "./Conclusion.css";
import "./Print.css";
import { conclusionOrder } from "../../sections/registry";
import type { ConclusionItem } from "../../sections/registry";
import NachaloList from "../NachaloList";
import ConclusionPanel from "../ConclusionPanel";
import type { ToggleTabHandler } from "../../types/components";

/*
Conclusion
заключение справа: три абзаца, собранные из списков разделов

Списки и их порядок берутся из реестра разделов (`conclusionOrder`):
второй абзац — описательная часть, третий — диагноз. «Начало осмотра»
подключается отдельным элементом первого абзаца. Если контакт недоступен
или помрачено сознание, описательная часть не выводится.

Хук читает только признак скрытия (boolean), поэтому ввод в поле заключение
не перерисовывает.
*/

interface OwnProps {
  toggleTab: ToggleTabHandler;
}

export default function Conclusion(props: OwnProps) {
  const { toggleTab } = props;

  // если контакт недоступен или помрачено сознание, описательная часть не выводится
  const isHidden = useAppSelector(state => {
    const kontakt = fieldOf(state, "kontakt");
    const soznanie = fieldOf(state, "soznanie");

    return isDescriptiveHidden({
      kontakt: kontakt && kontakt.number,
      soznanie: soznanie && soznanie.number
    });
  });

  const descriptive = conclusionOrder.filter(item => item.paragraph === 2);
  const visible = descriptive.filter(item => !item.hiddenWhenDescriptive);
  const hideable = descriptive.filter(item => item.hiddenWhenDescriptive);
  const after = conclusionOrder.filter(item => item.paragraph === 3);

  return (
    <div className="conclusion__box">
      <div className="conclusion__panel">
        <div className="conclusion__title">Заключение</div>
        <ConclusionPanel />
      </div>
      <div className="conclusion__text app__status-box" id="conclusion">
        <p>
          <NachaloList />
        </p>
        <p>
          {renderLists(visible, toggleTab)}
          {isHidden ? null : <span>{renderLists(hideable, toggleTab)}</span>}
        </p>
        {renderLists(after, toggleTab)}
      </div>
    </div>
  );
}

// списки разделов в заключении; ключ строится по разделу и позиции,
// потому что `kognit` в порядке вывода встречается дважды
function renderLists(items: ConclusionItem[], toggleTab: ToggleTabHandler) {
  return items.map((item, index) => {
    const List = item.List;

    return <List key={`${item.section}-${index}`} toggleTab={toggleTab} />;
  });
}
