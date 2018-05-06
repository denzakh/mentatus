import React, { Component } from 'react';
import anamnezData from "../../store/anamnezData.js";
import List from "../List";
import Text from "../Text";

export default class anamnezList extends Component {

  render() {

    let anamnezBefore = "anamnezBefore";
    let anamnezAfter = "anamnezAfter";
    let anamnezNet = "anamnezNet";


    let anamnezNameArr = Object.keys(anamnezData).filter(item => (
      anamnezData[item].cicle === "anamnezCicle"
    ));

    return <span data-id="anamnez" onClick={this.props.toggleTab} >
      <List 
        nameArr={anamnezNameArr} 
        dataObj={anamnezData} 
        psystatus={this.props.psystatus} 
        before={anamnezBefore} 
        after={anamnezAfter} 
        noList={anamnezNet} 
      />

      <Text 
        text={this.props.psystatus.anamnezText} 
      />
    </span>


  }
}