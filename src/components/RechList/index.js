import React, { Component } from 'react';
import dataBase from "../../store/rechData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";
import OnePraseFromRadio from "../OnePraseFromRadio";
import OrientirovkaList from "../OrientirovkaList";

export default class RechList extends Component {

  render() {


    return <span data-id="rech" onClick={this.props.toggleTab} >

      <OnePraseFromRadio 
        name="myshleniePosled" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      /> 

      <OnePraseFromRadio 
        name="myshlenieTemp" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      /> 

      <ListOfWords 
        name="myshlenie" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />
      <span>.</span>

      <FreeText 
        text={this.props.psystatus.myshlenieText} 
      />
      
    </span>


  }
}
