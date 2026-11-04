import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/affektData.js";
import { fieldOf } from "../../lib/redux";
import FieldView from "../FieldView";

class SonAppetitList extends Component {
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

function mapStateToProps(state) {
  const field = fieldOf(state, "appetitPohudel");

  return {
    hasPohudel: !!(field && field.text)
  };
}

export default connect(mapStateToProps)(SonAppetitList);
