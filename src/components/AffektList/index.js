import React, { Component } from 'react';
import dataBase from "../../store/affektData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";

import OnePraseFromRadio from "../OnePraseFromRadio";

export default class AffektList extends Component {

  render() {

    let nastroyeniyeKolebania = () => {
      if(this.props.psystatus.nastroyeniyeKolebania.isChecked) {
          return <span> 
            (<OnePraseFromRadio 
              name="nastroyeniyeKolebaniaPodrobno" 
              dataObj={dataBase} 
              psystatus={this.props.psystatus} 
              before=""
            />)   
          </span>      
        }
      }

    let appetitPohudel = () => {
      if(this.props.psystatus.appetitPohudel.text) {
        return <span>
          <FreeTextBeforeAndAfter 
            name="appetitPohudel" 
            dataObj={dataBase} 
            psystatus={this.props.psystatus} 
          />        
        </span>
      }
    };


    return <span data-id="affekt" onClick={this.props.toggleTab} >
      
      {/*Настроение*/}
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
      {nastroyeniyeKolebania()}
      <span>. </span> 

      <ListOfSentences 
        name="nastroyenieSeparate" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

      <FreeText 
        text={this.props.psystatus.nastroyeniyeText} 
      />

      {/*Тревога*/}
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
