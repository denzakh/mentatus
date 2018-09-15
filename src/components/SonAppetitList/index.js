import React, { Component } from 'react';
import dataBase from "../../store/affektData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";
import OnePraseFromRadio from "../OnePraseFromRadio";

export default class AffektList extends Component {

  render() {

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


    return <span>

      {/*Сон*/}
      <ListOfWords 
        name="son" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />
      <span>. </span>

      <ListOfSentences 
        name="sonSeparate" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

      {/*Аппетит*/}
      <OnePraseFromRadio 
        name="appetit" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      /> 
      {appetitPohudel()}
      <span>. </span> 

      <FreeText 
        text={this.props.psystatus.appetitText} 
      />

    </span>


  }
}
