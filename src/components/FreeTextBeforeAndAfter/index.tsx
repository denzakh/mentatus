import React, { Component } from "react";
import { connect } from "react-redux";
import { areStatePropsEqual, fieldOf } from "../../lib/redux";
import type { FieldViewOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";

/*
FreeTextBeforeAndAfter
компонент представления: свободный текст поля с фразами до и после

принимает:
name - имя поля в сторе
dataObj - объект БД, в котором лежат фразы before / after
*/

interface StateProps {
  value: string;
}

type Props = FieldViewOwnProps & StateProps;

class FreeTextBeforeAndAfter extends Component<Props> {
  render() {
    return <span>{this.props.value}</span>;
  }
}

function mapStateToProps(
  state: StatusState,
  ownProps: FieldViewOwnProps
): StateProps {
  const group = (ownProps.dataObj && ownProps.dataObj[ownProps.name]) || {};
  const field = fieldOf(state, ownProps.name);

  return {
    value:
      (group.before || "") + ((field && field.text) || "") + (group.after || "")
  };
}

export default connect<StateProps, unknown, FieldViewOwnProps>(
  mapStateToProps,
  null,
  null,
  { areStatePropsEqual }
)(FreeTextBeforeAndAfter);
