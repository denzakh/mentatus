import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/kognitData";
import { fingerPhrase } from "../../lib/text";
import { fieldOf } from "../../lib/redux";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";

interface StateProps {
  fingerText: string;
}

type Props = ListOwnProps & StateProps;

class KognitList extends Component<Props> {
  render() {
    return (
      <span data-id="kognit" onClick={this.props.toggleTab}>
        {/*Интел-мнест функции*/}
        <FieldView name="kognitOsnivnoi" dataObj={dataBase} />
        {/*Отмечается*/}
        <FieldView name="otmech" dataObj={dataBase} />

        {/*пальцы*/}
        <span> {this.props.fingerText}</span>

        {/*Отдельно*/}
        <FieldView name="otdel" dataObj={dataBase} as="sentences" />
      </span>
    );
  }
}

function mapStateToProps(state: StatusState): StateProps {
  const field = fieldOf(state, "kognitFingerN");

  return {
    fingerText: fingerPhrase(field && field.number)
  };
}

export default connect<StateProps, unknown, ListOwnProps>(mapStateToProps)(
  KognitList
);
