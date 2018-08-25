import React, { Component } from 'react';
import dataBase from "../../store/anamnezData.js";
import ListOfWords from "../ListOfWords";
import FreeText from "../FreeText";

export default class AnamnezList extends Component {

  render() {

    return <span data-id="anamnez" onClick={this.props.toggleTab} >
      <ListOfWords 
        name="anamnezCicle" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

      <FreeText 
        text={this.props.psystatus.anamnezText} 
      />
    </span>


  }
}