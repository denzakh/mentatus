import React, { Component } from 'react';
import dataBase from "../../store/kognitData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";
import OnePraseFromRadio from "../OnePraseFromRadio";
import OrientirovkaList from "../OrientirovkaList";

export default class AffektList extends Component {

  render() {

    // пальцы
    let finger = () => {

      let fingerNumber = +this.props.psystatus.kognitFingerN.number;
      let fingerText = "";
      switch (fingerNumber) {
        case 1: 
          fingerText = "Фингерагнозия, называет правильно только один палец. ";
          break;
        case 2: 
          fingerText = "Фингерагнозия, называет правильно только 2 пальца. ";
          break;
        case 3: 
          fingerText = "Фингерагнозия, правильно называет 3 пальца. ";
          break;
        case 4: 
          fingerText = "Фингерагнозия, правильно называет 4 пальца. ";
          break;
        case 5: 
          fingerText = "Фингерагнозии не выявляется. ";
          break;
        default: fingerText = "";            
      }

      return <span> {fingerText}</span>      
    }

    return <span data-id="kognit" onClick={this.props.toggleTab} >

      {/*Интел-мнест функции*/}
      <OnePraseFromRadio 
        name="kognitOsnivnoi" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      /> 
      {/*Отмечается*/}
      <ListOfWords 
        name="otmech" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

      {finger()}      

      {/*Отдельно*/}
      <ListOfWords 
        name="otdel" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />      






    </span>


  }
}
