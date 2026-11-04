import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/zhalobyData";
import { fieldOf } from "../../lib/redux";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";

interface StateProps {
  isHidden: boolean;
}

type Props = ListOwnProps & StateProps;

class ZhalobyList extends Component<Props> {
  render() {
    return (
      <span
        className="list__section"
        data-id="zhaloby"
        onClick={this.props.toggleTab}
      >
        {this.props.isHidden ? null : (
          <FieldView name="zhalobyCicle" dataObj={dataBase} />
        )}

        <FieldView name="zhalobyText" dataObj={dataBase} />
      </span>
    );
  }
}

// жалобы не выводятся, если речь нарушена, контакт недоступен
// или помрачено сознание
function mapStateToProps(state: StatusState): StateProps {
  const rechOtkl = fieldOf(state, "rechOtkl");
  const rechNeotvechaet = fieldOf(state, "rechNeotvechaet");
  const kontakt = fieldOf(state, "kontakt");
  const soznanie = fieldOf(state, "soznanie");

  return {
    isHidden:
      !!(rechOtkl && rechOtkl.isChecked) ||
      !!(rechNeotvechaet && rechNeotvechaet.isChecked) ||
      +((kontakt && kontakt.number) || 0) === 2 ||
      +((soznanie && soznanie.number) || 0) === 7
  };
}

export default connect<StateProps, unknown, ListOwnProps>(mapStateToProps)(
  ZhalobyList
);
