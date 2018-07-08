import React, { Component } from 'react';
import dataBase from "../../store/affektData.js";
import List from "../List";
import Text from "../Text";
import OnePraseFromRadio from "../OnePraseFromRadio";

export default class AffektList extends Component {

  render() {

    return <span data-id="affekt" onClick={this.props.toggleTab} >
      
      <OnePraseFromRadio 
        name="nastroyeniye" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      /> 

      <List 
        name="vSvyazi" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

      <List 
        name="s" 
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />.

      


    </span>


  }
}


{/*<List 
  name="nastroyenieSeparate" 
  dataObj={dataBase} 
  psystatus={this.props.psystatus} 
/>*/}