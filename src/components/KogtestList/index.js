import React, { Component } from 'react';
import dataBase from "../../store/kogtestData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";
import OnePraseFromRadio from "../OnePraseFromRadio";

export default class KogtestList extends Component {

  render() {

    return <span data-id="kogtest" onClick={this.props.toggleTab} >


    </span>


  }
}
