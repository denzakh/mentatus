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

    let odnosloj = () => {
      if (this.props.psystatus.rechOdnosloj.isChecked){
        return <span>
          , {dataBase["rechOdnosloj"].phrase}
        </span>
      }
    }

    let rechShow = () => {
      if(this.props.psystatus.rechOtkl.isChecked) {
        return 
      } else {
        return <span>
         <OnePraseFromRadio 
            name="rechTemp" 
            dataObj={dataBase} 
            psystatus={this.props.psystatus} 
          /> 

          <ListOfWords 
            name="rechOsob" 
            dataObj={dataBase} 
            psystatus={this.props.psystatus} 
            isAnd = {false}
          />
          <span>, </span>

          <OnePraseFromRadio 
            name="rechSuschestvo" 
            dataObj={dataBase} 
            psystatus={this.props.psystatus} 
          /> 
          {odnosloj()}
          <span>. </span>

          <ListOfWords 
            name="rechOtmech" 
            dataObj={dataBase} 
            psystatus={this.props.psystatus} 
            isAnd = {false}
          />    
        </span>
      }
    };

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
        isAnd = {true}
      />
      <span>.</span>

      <FreeText 
        text={this.props.psystatus.myshlenieText} 
      />

      {rechShow()}

      <ListOfSentences 
        name="rechGrub" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

 


    </span>


  }
}
