import React, { Component } from 'react';
import dataBase from "../../store/zhalobyData.js";
import ListOfWords from "../ListOfWords";
import FreeText from "../FreeText";

export default class ZhalobyList extends Component {

  render() {

    return <span className="list__section" data-id="zhaloby" onClick={this.props.toggleTab} >
      <ListOfWords 
        name="zhalobyCicle"
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

      <FreeText 
        text={this.props.psystatus.zhalobyText} 
      />
    </span>


  }
}