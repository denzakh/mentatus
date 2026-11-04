import React, { Component } from "react";
import dataBase from "../../store/sostoyanieData";
import ListOfWordsZatrud from "../ListOfWordsZatrud";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";

export default class SostoyanieList extends Component<ListOwnProps> {
  render() {
    return (
      <span data-id="sostoyanie" onClick={this.props.toggleTab}>
        <FieldView name="soznanie" dataObj={dataBase} />

        <FieldView name="kontakt" dataObj={dataBase} />

        {/*затруднен*/}
        <ListOfWordsZatrud name="zatrud" dataObj={dataBase} />

        {/*Отдельно*/}
        <FieldView name="vpech" dataObj={dataBase} as="sentences" />

        <FieldView name="sostoyanieText" dataObj={dataBase} />
      </span>
    );
  }
}
