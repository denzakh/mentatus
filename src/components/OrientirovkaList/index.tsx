import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/kognitData";
import { fieldOf } from "../../lib/redux";
import { orientationPhrase } from "../../lib/text/orientation";
import type { ListOwnProps } from "../../types/components";
import type { OrientirSchemaEntry } from "../../types/schema";
import type { StatusState } from "../../types/status";

interface StateProps {
  phrase?: string;
  text?: string | false;
}

type Props = ListOwnProps & StateProps;

class OrientirovkaList extends Component<Props> {
  render() {
    return (
      <span data-id="kognit" onClick={this.props.toggleTab}>
        {this.props.phrase}
        <span> {this.props.text} </span>
      </span>
    );
  }
}

function mapStateToProps(state: StatusState): StateProps {
  const orientirNot = fieldOf(state, "orientirNot");
  const orientirVremia = fieldOf(state, "orientirVremia");
  const orientirMesto = fieldOf(state, "orientirMesto");
  const orientirLichnost = fieldOf(state, "orientirLichnost");
  const orientirText = fieldOf(state, "orientirText");
  const pol = fieldOf(state, "pol");
  const rechOtkl = fieldOf(state, "rechOtkl");

  const orientir = dataBase.orientir as OrientirSchemaEntry;

  return {
    phrase: orientationPhrase(orientir, {
      notDefined: !!(orientirNot && orientirNot.isChecked),
      time: orientirVremia && orientirVremia.number,
      place: orientirMesto && orientirMesto.number,
      person: orientirLichnost && orientirLichnost.number,
      isMale: !!(pol && pol.isChecked),
      isRechOtkl: !!(rechOtkl && rechOtkl.isChecked)
    }),
    text: orientirText && orientirText.text
  };
}

export default connect<StateProps, unknown, ListOwnProps>(mapStateToProps)(
  OrientirovkaList
);
