import React, { Component } from "react";
import { connect } from "react-redux";
import { cicleKeys, pickPhrase } from "../../lib/text";
import { flagsOf, areStatePropsEqual, fieldOf } from "../../lib/redux";
import type { Flags } from "../../lib/redux";
import type { FieldViewOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";

/*
ListOfSentences
компонент представления: каждый включённый пункт цикла — отдельным предложением

принимает:
name - имя цикла
dataObj - объект БД

из стора берёт: какие пункты цикла включены и пол пациента
*/

interface StateProps {
  flags: Flags;
  isMale: boolean;
}

type Props = FieldViewOwnProps & StateProps;

class ListOfSentences extends Component<Props> {
  render() {
    const { dataObj, name, flags, isMale } = this.props;

    // включённые пункты цикла
    const items = cicleKeys(dataObj, name).filter(key => flags[key]);

    return (
      <span>
        {items.map(key => (
          <span key={key}>{pickPhrase(dataObj[key], isMale)}. </span>
        ))}
      </span>
    );
  }
}

function mapStateToProps(
  state: StatusState,
  ownProps: FieldViewOwnProps
): StateProps {
  const pol = fieldOf(state, "pol");

  return {
    flags: flagsOf(state, cicleKeys(ownProps.dataObj, ownProps.name)),
    isMale: !!(pol && pol.isChecked)
  };
}

export default connect<StateProps, unknown, FieldViewOwnProps>(
  mapStateToProps,
  null,
  null,
  { areStatePropsEqual }
)(ListOfSentences);
