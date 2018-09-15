import React, { Component } from 'react';
import dataBase from "../../store/anamnezData.js";
import ListOfWords from "../ListOfWords";
import FreeText from "../FreeText";

export default class AnamnezList extends Component {

  render() {

    let anamnezShow = () => {
      if(this.props.psystatus.anamnezOtkl.isChecked) {
        return 
      } else {
        return <span>
          <ListOfWords 
            name="anamnezCicle" 
            dataObj={dataBase} 
            psystatus={this.props.psystatus} 
          />    
        </span>
      }
    };

    return <span data-id="anamnez" onClick={this.props.toggleTab} >

      {anamnezShow()}
      
      <FreeText 
        text={this.props.psystatus.anamnezText} 
      />
    </span>


  }
}