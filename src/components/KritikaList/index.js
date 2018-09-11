import React, { Component } from 'react';
import dataBase from "../../store/sostoyanieData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";
import OnePraseFromRadio from "../OnePraseFromRadio";
import OrientirovkaList from "../OrientirovkaList";

export default class KritikaList extends Component {

  render() {

    return <span data-id="sostoyanie" onClick={this.props.toggleTab} >

      <OnePraseFromRadio 
        name="kritika" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      /> 

      <FreeText 
        text={this.props.psystatus.kritikaText} 
      />

    </span>


  }
}
