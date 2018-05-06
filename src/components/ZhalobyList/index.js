import React, { Component } from 'react';
import zhalobyData from "../../store/zhalobyData.js";
import List from "../List";
import Text from "../Text";

export default class ZhalobyList extends Component {

  render() {

    let zhalobyBefore = "zhalobyBefore";
    let zhalobyAfter = "zhalobyAfter";
    let zhalobyNet = "zhalobyNet";


    let zhalobyNameArr = Object.keys(zhalobyData).filter(item => (
      zhalobyData[item].cicle === "zhalobyCicle"
    ));

    return <span>
      <List 
        nameArr={zhalobyNameArr} 
        dataObj={zhalobyData} 
        psystatus={this.props.psystatus} 
        before={zhalobyBefore} 
        after={zhalobyAfter} 
        noList={zhalobyNet} 
      />

      <Text 
        text={this.props.psystatus.zhalobyText} 
      />
    </span>


  }
}