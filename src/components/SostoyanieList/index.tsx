import React, { Component } from "react";
import dataBase from "../../store/sostoyanieData.js";
import ListOfWordsZatrud from "../ListOfWordsZatrud";
import FieldView from "../FieldView";

export default class SostoyanieList extends Component {
  render() {
    return (
      <span data-id="sostoyanie" onClick={this.props.toggleTab}>
        <FieldView name="soznanie" dataObj={dataBase} />

        <FieldView name="kontakt" dataObj={dataBase} />

        {/*затруднен*/}
        <ListOfWordsZatrud name="zatrud" dataObj={dataBase} isAnd="true" />

        {/*Отдельно*/}
        <FieldView name="vpech" dataObj={dataBase} as="sentences" />

        <FieldView name="sostoyanieText" dataObj={dataBase} />
      </span>
    );
  }
}
