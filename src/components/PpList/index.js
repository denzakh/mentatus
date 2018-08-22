import React, { Component } from 'react';
import dataBase from "../../store/ppData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";
import OnePraseFromRadio from "../OnePraseFromRadio";
import OrientirovkaList from "../OrientirovkaList";

export default class AffektList extends Component {

  render() {

    return <span data-id="kognit" onClick={this.props.toggleTab} >

      {/*Бред*/}
      <ListOfWords 
        name="bred" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />
    </span>


  }
}
