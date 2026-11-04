import React, { Component } from "react";
import { connect } from "react-redux";
import { areStatePropsEqual, fieldOf } from "../../lib/redux";
import type { FieldViewOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";

/*
FreeText
компонент представления: свободный текст поля

принимает:
name - имя поля в сторе

из стора берёт: значение поля
*/

interface StateProps {
  value: string;
}

type Props = FieldViewOwnProps & StateProps;

class FreeText extends Component<Props> {
  render() {
    return <span> {this.props.value}</span>;
  }
}

function mapStateToProps(
  state: StatusState,
  ownProps: FieldViewOwnProps
): StateProps {
  const field = fieldOf(state, ownProps.name);

  return {
    value: (field && field.text) || ""
  };
}

export default connect<StateProps, unknown, FieldViewOwnProps>(
  mapStateToProps,
  null,
  null,
  { areStatePropsEqual }
)(FreeText);
