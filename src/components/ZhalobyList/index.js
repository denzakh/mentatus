import React, { Component } from 'react';
import dataBase from "../../store/zhalobyData.js";
import List from "../List";
import Text from "../Text";

export default class ZhalobyList extends Component {

  render() {

    return <span className="list__section" data-id="zhaloby" onClick={this.props.toggleTab} >
      <List 
        name="zhalobyCicle"
        dataObj={dataBase} 
        psystatus={this.props.psystatus} 
      />

      <Text 
        text={this.props.psystatus.zhalobyText} 
      />
    </span>


  }
}