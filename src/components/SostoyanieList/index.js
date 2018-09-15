import React, { Component } from 'react';
import dataBase from "../../store/sostoyanieData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";
import OnePraseFromRadio from "../OnePraseFromRadio";
import OrientirovkaList from "../OrientirovkaList";
import Textarea from "../Textarea";

export default class SostoyanieList extends Component {

  render() {



    return <span data-id="sostoyanie" onClick={this.props.toggleTab} >

      <OnePraseFromRadio 
        name="soznanie" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      /> 

      <OnePraseFromRadio 
        name="kontakt" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      /> 

      {/*Отмечается*/}
      <ListOfWords 
        name="zatrud" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

      {/*Отдельно*/}
      <ListOfSentences
        name="vpech" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      /> 

    </span>


  }
}
