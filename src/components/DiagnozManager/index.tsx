import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setText } from "../../actions/textAction";
import { fieldOf } from "../../lib/redux";
import type { StatusState } from "../../types/status";
import "./Diagnoz.css";

interface StateProps {
  mkb10: string;
  klin: string;
  dopolnenie: string;
  reqilech: string;
}

interface DispatchProps {
  setText: (name: string, value: string) => void;
}

type Props = StateProps & DispatchProps;

class DiagnozManager extends Component<Props> {
  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.props.setText(e.target.name, e.target.value);
  };

  render() {
    const { mkb10, klin, dopolnenie, reqilech } = this.props;

    return (
      <div className="diagnoz">
        <div className="diagnoz__row diagnoz__row--mkb">
          <span className="diagnoz__title">Диагноз</span>&nbsp;
          <span className="diagnoz__mkb-label">МКБ-10:</span>
          F&nbsp;
          <input
            className="diagnoz__mkb-input"
            name="diagnozMkb10"
            onChange={this.handleChange}
            value={mkb10}
          />
        </div>
        <div className="diagnoz__row">
          Основной:
          <br />
          <textarea
            className="diagnoz__textarea"
            name="diagnozKlin"
            onChange={this.handleChange}
            value={klin}
          />
        </div>
        <div className="diagnoz__row">
          Дополнительный:
          <br />
          <textarea
            className="diagnoz__textarea"
            name="diagnozDopolnenie"
            onChange={this.handleChange}
            value={dopolnenie}
          />
        </div>
        <br />

        <div className="diagnoz__row">
          <span className="diagnoz__title">Рекомендации и лечение:</span>
          <br />
          <textarea
            className="diagnoz__textarea diagnoz__textarea--req"
            name="reqilech"
            onChange={this.handleChange}
            value={reqilech}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: StatusState): StateProps {
  const mkb10 = fieldOf(state, "diagnozMkb10");
  const klin = fieldOf(state, "diagnozKlin");
  const dopolnenie = fieldOf(state, "diagnozDopolnenie");
  const reqilech = fieldOf(state, "reqilech");

  return {
    mkb10: (mkb10 && mkb10.text) || "",
    klin: (klin && klin.text) || "",
    dopolnenie: (dopolnenie && dopolnenie.text) || "",
    reqilech: (reqilech && reqilech.text) || ""
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    setText: (name, value) => dispatch(setText(name, value))
  };
}

export default connect<StateProps, DispatchProps, unknown>(
  mapStateToProps,
  mapDispatchToProps
)(DiagnozManager);
