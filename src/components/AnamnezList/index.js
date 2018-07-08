import React, { Component } from 'react';
import dataBase from "../../store/anamnezData.js";
import List from "../List";
import Text from "../Text";

export default class anamnezList extends Component {

  render() {

    return <span data-id="anamnez" onClick={this.props.toggleTab} >
      <List 
        name="anamnezCicle" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

      <Text 
        text={this.props.psystatus.anamnezText} 
      />
    </span>


  }
}