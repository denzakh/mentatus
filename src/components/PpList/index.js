import React, { Component } from 'react';
import dataBase from "../../store/ppData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";
import OnePraseFromRadio from "../OnePraseFromRadio";
import OrientirovkaList from "../OrientirovkaList";

export default class PpList extends Component {

  render() {

    let bredShow = () => {
      if(this.props.psystatus.bredOtkl.isChecked) {
        return 
      } else {
        return <span>
          <ListOfWords 
            name="bred" 
            dataObj={dataBase} 
            psystatus={this.props.psystatus} 
          />      
        </span>
      }
    };

    let gallShow = () => {
      if(this.props.psystatus.gallOtkl.isChecked) {
        return 
      } else {
        return <span>
          <ListOfWords 
            name="gall" 
            dataObj={dataBase} 
            psystatus={this.props.psystatus} 
          />      
        </span>
      }
    };

    return <span data-id="pp" onClick={this.props.toggleTab} >

      {bredShow()}
      <FreeText 
        text={this.props.psystatus.bredText} 
      />

      {gallShow()}
      <FreeText 
        text={this.props.psystatus.gallText} 
      />

    </span>


  }
}
