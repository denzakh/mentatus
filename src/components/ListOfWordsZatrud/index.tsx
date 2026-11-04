import React, { Component } from "react";
import ListOfWords from "../ListOfWords";
import type { Schema } from "../../types/schema";

// причины затрудненного контакта: отличается от ListOfWords
// только вступительной фразой
interface Props {
  name: string;
  dataObj?: Schema;
  isAnd?: boolean;
}

export default class ListOfWordsZatrud extends Component<Props> {
  render() {
    return (
      <ListOfWords
        name={this.props.name}
        dataObj={this.props.dataObj}
        isAnd={true}
        beforeText=", но он затруднен из-за "
      />
    );
  }
}
