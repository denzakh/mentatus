import React, { Component } from 'react';
import zhalobyData from "../../store/zhalobyData.js";
import List from "../List";

export default class ZhalobyList extends Component {

  render() {

    let zhalobyBefore = zhalobyData.zhalobyBefore.phrase;
    let zhalobyAfter = zhalobyData.zhalobyAfter.phrase;
    let zhalobyNet = zhalobyData.zhalobyNet.phrase;


    let zhalobyNameArr = Object.keys(zhalobyData).filter(item => (
      zhalobyData[item].cicle === "zhalobyCicle"
    ));

    return <List 
      nameArr={zhalobyNameArr} 
      dataObj={zhalobyData} 
      psystatus={this.props.psystatus} 
      before={zhalobyBefore} 
      after={zhalobyAfter} 
      noList={zhalobyNet} 
    />; 
  }
}