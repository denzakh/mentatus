import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/affektData";
import { fieldOf } from "../../lib/redux";
import FieldView from "../FieldView";
import type { StatusState } from "../../types/status";

interface StateProps {
  hasPohudel: boolean;
}

class SonAppetitList extends Component<StateProps> {
  render() {
    return (
      <span>
        {/*Сон*/}
        <FieldView name="son" dataObj={dataBase} />
        <span>. </span>

        <FieldView name="sonSeparate" dataObj={dataBase} as="sentences" />

        {/*Аппетит*/}
        <FieldView name="appetit" dataObj={dataBase} />
        {this.props.hasPohudel ? (
          <span>
            <FieldView name="appetitPohudel" dataObj={dataBase} />
          </span>
        ) : null}
        <span>. </span>

        <FieldView name="appetitText" dataObj={dataBase} />
      </span>
    );
  }
}

function mapStateToProps(state: StatusState): StateProps {
  const field = fieldOf(state, "appetitPohudel");

  return {
    hasPohudel: !!(field && field.text)
  };
}

export default connect(mapStateToProps)(SonAppetitList);
