import React, { Component } from "react";
import { connect } from "react-redux";
import { fieldOf } from "../../lib/redux";
import { isDescriptiveHidden } from "../../lib/rules/visibility";
import "./Conclusion.css";
import "./Print.css";
import ZhalobyList from "../ZhalobyList";
import AnamnezList from "../AnamnezList";
import SostoyanieList from "../SostoyanieList";
import AffektList from "../AffektList";
import RechList from "../RechList";
import KognitList from "../KognitList";
import OrientirovkaList from "../OrientirovkaList";
import PpList from "../PpList";
import DiagnozList from "../DiagnozList";
import NachaloList from "../NachaloList";
import ConclusionPanel from "../ConclusionPanel";
import type { ToggleTabHandler } from "../../types/components";
import type { StatusState } from "../../types/status";

interface OwnProps {
  toggleTab: ToggleTabHandler;
}

interface StateProps {
  isHidden: boolean;
}

type Props = OwnProps & StateProps;

class Conclusion extends Component<Props> {
  render() {
    const { isHidden, toggleTab } = this.props;

    return (
      <div className="conclusion__box">
        <div className="conclusion__panel">
          <div className="conclusion__title">Заключение</div>
          <ConclusionPanel />
        </div>
        <div className="conclusion__text app__status-box" id="conclusion">
          <p>
            <NachaloList toggleTab={toggleTab} />
          </p>
          <p>
            <AnamnezList toggleTab={toggleTab} />
            <SostoyanieList toggleTab={toggleTab} />
            {isHidden ? null : (
              <span>
                <ZhalobyList toggleTab={toggleTab} />
                <OrientirovkaList toggleTab={toggleTab} />
                <AffektList toggleTab={toggleTab} />
                <RechList toggleTab={toggleTab} />
                <KognitList toggleTab={toggleTab} />
                <PpList toggleTab={toggleTab} />
              </span>
            )}
          </p>
          <DiagnozList toggleTab={toggleTab} />
        </div>
      </div>
    );
  }
}

// если контакт недоступен или помрачено сознание, описательная часть не выводится
function mapStateToProps(state: StatusState): StateProps {
  const kontakt = fieldOf(state, "kontakt");
  const soznanie = fieldOf(state, "soznanie");

  return {
    isHidden: isDescriptiveHidden({
      kontakt: kontakt && kontakt.number,
      soznanie: soznanie && soznanie.number
    })
  };
}

export default connect<StateProps, unknown, OwnProps>(mapStateToProps)(
  Conclusion
);
