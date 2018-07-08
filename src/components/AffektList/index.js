import React, { Component } from 'react';
import dataBase from "../../store/affektData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import OnePraseFromRadio from "../OnePraseFromRadio";

export default class AffektList extends Component {

  render() {

    return <span data-id="affekt" onClick={this.props.toggleTab} >
      
      Настроение
      <OnePraseFromRadio 
        name="nastroyeniye" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      /> 

      <ListOfWords 
        name="vSvyazi" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

      <ListOfWords 
        name="s" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />
      <span>. </span> 

      <ListOfSentences 
        name="nastroyenieSeparate" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

      <FreeText 
        text={this.props.psystatus.nastroyeniyeText} 
      />

      <OnePraseFromRadio 
        name="trevoga" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      /> 
      <span>. </span> 

      <ListOfSentences 
        name="trevogaSeparate" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

      <FreeText 
        text={this.props.psystatus.trevogaText} 
      />




    </span>


  }
}
