import React, { Component } from "react";
import ListOfWords from "../ListOfWords";

// причины затрудненного контакта: отличается от ListOfWords
// только вступительной фразой
export default class ListOfWordsZatrud extends Component {
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
