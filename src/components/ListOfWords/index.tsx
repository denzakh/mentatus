import React, { Component } from "react";
import { connect } from "react-redux";
import { cicleKeys, buildListText } from "../../lib/text";
import { flagsOf, areStatePropsEqual } from "../../lib/redux";
import type { Flags } from "../../lib/redux";
import type { Schema } from "../../types/schema";
import type { StatusState } from "../../types/status";

/*
ListOfWords
компонент представления

принимает:
name - имя цикла
dataObj - объект БД
isAnd - соединять последние пункты союзом «и»
beforeText - своя вступительная фраза (вместо name + "Before")
before / after / noList - переопределение ключей фраз обрамления

из стора берёт: какие пункты цикла включены
*/

interface OwnProps {
  name: string;
  dataObj?: Schema;
  isAnd?: boolean;
  beforeText?: string;
  before?: string;
  after?: string;
  noList?: string;
}

interface StateProps {
  flags: Flags;
  isAnd: boolean;
  beforePhrase: string;
  afterPhrase: string;
  noListPhrase: string;
}

type Props = OwnProps & StateProps;

class ListOfWords extends Component<Props> {
  render() {
    const {
      dataObj,
      name,
      isAnd,
      beforePhrase,
      afterPhrase,
      noListPhrase
    } = this.props;
    const flags = this.props.flags;

    // включённые пункты цикла
    const items = cicleKeys(dataObj, name)
      .filter(key => flags[key])
      .map(key => ({ key: key, phrase: dataObj[key].phrase }));

    const parts = buildListText(items, {
      isAnd: isAnd,
      before: beforePhrase,
      after: afterPhrase,
      noList: noListPhrase
    });

    return (
      <span>
        {parts.map(part => (
          <span key={part.key}>
            {part.text}
            {part.separator}
          </span>
        ))}
      </span>
    );
  }
}

function mapStateToProps(
  state: StatusState,
  ownProps: OwnProps
): StateProps {
  const dataObj = ownProps.dataObj;
  const name = ownProps.name;

  // ключи фраз обрамления и фразы «нет данных»
  const beforeKey = ownProps.before || name + "Before";
  const afterKey = ownProps.after || name + "After";
  const noListKey = ownProps.noList || name + "Not";

  return {
    flags: flagsOf(state, cicleKeys(dataObj, name)),
    isAnd: !!ownProps.isAnd,
    beforePhrase:
      ownProps.beforeText ||
      (dataObj[beforeKey] ? dataObj[beforeKey].phrase : ""),
    afterPhrase: dataObj[afterKey] ? dataObj[afterKey].phrase : "",
    noListPhrase: dataObj[noListKey] ? dataObj[noListKey].phrase : ""
  };
}

export default connect<StateProps, unknown, OwnProps>(
  mapStateToProps,
  null,
  null,
  { areStatePropsEqual }
)(ListOfWords);
