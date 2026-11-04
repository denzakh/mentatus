import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/anamnezData";
import { fieldOf } from "../../lib/redux";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";

interface StateProps {
  isHidden: boolean;
}

type Props = ListOwnProps & StateProps;

class AnamnezList extends Component<Props> {
  render() {
    return (
      <span data-id="anamnez" onClick={this.props.toggleTab}>
        {this.props.isHidden ? null : (
          <span>
            <FieldView name="anamnezCicle" dataObj={dataBase} />
          </span>
        )}

        <FieldView name="anamnezText" dataObj={dataBase} />
      </span>
    );
  }
}

// анамнез не выводится, если врач его не собрал
function mapStateToProps(state: StatusState): StateProps {
  const field = fieldOf(state, "anamnezOtkl");

  return {
    isHidden: !!(field && field.isChecked)
  };
}

export default connect<StateProps, unknown, ListOwnProps>(mapStateToProps)(
  AnamnezList
);
