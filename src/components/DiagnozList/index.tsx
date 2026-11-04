import React, { Component } from "react";
import { connect } from "react-redux";
import { fieldOf } from "../../lib/redux";
import type { ListOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";

interface StateProps {
  mkb10?: string | false;
  klin?: string | false;
  dopolnenie?: string | false;
  reqilech?: string | false;
}

type Props = ListOwnProps & StateProps;

class DiagnozList extends Component<Props> {
  render() {
    const { mkb10, klin, dopolnenie, reqilech } = this.props;

    const diagnozText = () => {
      if (!mkb10 && !klin && !dopolnenie) {
        return null;
      }

      return (
        <p>
          <span> Диагноз: </span>
          {mkb10 ? <span>F {mkb10} &nbsp;</span> : null}
          <span>{klin} &nbsp;</span>
          {dopolnenie ? (
            <span>
              <br />
              {dopolnenie} &nbsp;
            </span>
          ) : null}
        </p>
      );
    };

    const reqText = () => {
      if (!reqilech) {
        return null;
      }

      return (
        <p>
          <span> Рекомендовано: </span> <br />
          <span className="pre">{reqilech} &nbsp;</span>
        </p>
      );
    };

    return (
      <div data-id="diagnoz" onClick={this.props.toggleTab}>
        {diagnozText()}
        {reqText()}
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
    mkb10: mkb10 && mkb10.text,
    klin: klin && klin.text,
    dopolnenie: dopolnenie && dopolnenie.text,
    reqilech: reqilech && reqilech.text
  };
}

export default connect<StateProps, unknown, ListOwnProps>(mapStateToProps)(
  DiagnozList
);
