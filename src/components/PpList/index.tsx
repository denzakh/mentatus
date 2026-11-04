import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/ppData";
import { fieldOf } from "../../lib/redux";
import FieldView from "../FieldView";
import SonAppetitList from "../SonAppetitList";
import KritikaList from "../KritikaList";
import type { ListOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";

interface StateProps {
  isBredHidden: boolean;
  isGallHidden: boolean;
  isOpasnyeHidden: boolean;
}

type Props = ListOwnProps & StateProps;

class PpList extends Component<Props> {
  render() {
    return (
      <span>
        <span data-id="pp" onClick={this.props.toggleTab}>
          {this.props.isBredHidden ? null : (
            <span>
              <FieldView name="bred" dataObj={dataBase} />
            </span>
          )}

          <FieldView name="bredText" dataObj={dataBase} />

          {this.props.isGallHidden ? null : (
            <span>
              <FieldView name="gall" dataObj={dataBase} />
            </span>
          )}

          <FieldView name="gallText" dataObj={dataBase} />

          {/*Опасные*/}
          {this.props.isOpasnyeHidden ? null : (
            <span>
              <FieldView name="opasnye" dataObj={dataBase} />

              <FieldView name="opasnyeAgressia" dataObj={dataBase} />
            </span>
          )}

          <FieldView name="opasnyeText" dataObj={dataBase} />
        </span>

        <span data-id="affekt" onClick={this.props.toggleTab}>
          <SonAppetitList />
        </span>

        <span data-id="pp" onClick={this.props.toggleTab}>
          <KritikaList />
        </span>
      </span>
    );
  }
}

function mapStateToProps(state: StatusState): StateProps {
  const bredOtkl = fieldOf(state, "bredOtkl");
  const gallOtkl = fieldOf(state, "gallOtkl");
  const opasnyeOtkl = fieldOf(state, "opasnyeOtkl");

  return {
    isBredHidden: !!(bredOtkl && bredOtkl.isChecked),
    isGallHidden: !!(gallOtkl && gallOtkl.isChecked),
    isOpasnyeHidden: !!(opasnyeOtkl && opasnyeOtkl.isChecked)
  };
}

export default connect<StateProps, unknown, ListOwnProps>(mapStateToProps)(
  PpList
);
