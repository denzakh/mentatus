import React, { Component } from "react";
import { connect } from "react-redux";
import { areStatePropsEqual } from "../../lib/redux";

/*
FreeText
компонент представления: свободный текст поля

принимает:
name - имя поля в сторе

из стора берёт: значение поля
*/

class FreeText extends Component {
  render() {
    return <span> {this.props.value}</span>;
  }
}

function mapStateToProps(state, ownProps) {
  const field = state.psystatus[ownProps.name];

  return {
    value: (field && field.text) || ""
  };
}

export default connect(mapStateToProps, null, null, { areStatePropsEqual })(
  FreeText
);
