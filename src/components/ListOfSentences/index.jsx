import React, { Component } from "react";
import { connect } from "react-redux";
import { cicleKeys, pickPhrase } from "../../lib/text";
import { flagsOf, areStatePropsEqual } from "../../lib/redux";

/*
ListOfSentences
компонент представления: каждый включённый пункт цикла — отдельным предложением

принимает:
name - имя цикла
dataObj - объект БД

из стора берёт: какие пункты цикла включены и пол пациента
*/

class ListOfSentences extends Component {
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

function mapStateToProps(state, ownProps) {
  const psystatus = state.psystatus;

  return {
    flags: flagsOf(psystatus, cicleKeys(ownProps.dataObj, ownProps.name)),
    isMale: psystatus.pol.isChecked
  };
}

export default connect(mapStateToProps, null, null, { areStatePropsEqual })(
  ListOfSentences
);
