import React, { Component } from "react";
import { connect } from "react-redux";
import { areStatePropsEqual, fieldOf } from "../../lib/redux";

/*
FreeTextBeforeAndAfter
компонент представления: свободный текст поля с фразами до и после

принимает:
name - имя поля в сторе
dataObj - объект БД, в котором лежат фразы before / after
*/

class FreeTextBeforeAndAfter extends Component {
  render() {
    return <span>{this.props.value}</span>;
  }
}

function mapStateToProps(state, ownProps) {
  const group = ownProps.dataObj[ownProps.name] || {};
  const field = fieldOf(state, ownProps.name);

  return {
    value:
      (group.before || "") + ((field && field.text) || "") + (group.after || "")
  };
}

export default connect(mapStateToProps, null, null, { areStatePropsEqual })(
  FreeTextBeforeAndAfter
);
