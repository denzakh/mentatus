import React, { Component } from 'react';
import dataBase from "../../store/kognitData.js";
import Checkbox from "../Checkbox";
import CheckboxOtkl from "../CheckboxOtkl";
import RadioList from "../RadioList";
import RadioListInline from "../RadioListInline";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
import cicleFn from "../../fn/cicleFn";
// import "./Pp.css";

export default class KogtestManager extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {   

    // показ списка бред
    // let bredNameArr = cicleFn(dataBase, "bred"); 

    // let bredList = bredNameArr.map(item => (
    //   <div key={item} className="list__item">
    //     <Checkbox 
    //     checked = {this.props.psystatus[item].isChecked}
    //     onChange = {this.props.toggleSymptom}
    //     name = {item}
    //     label = {dataBase[item].label}
    //   />
    //   </div>
    // ));

    // let bredListShow = () => {
    //   if(this.props.psystatus["bredOtkl"].isChecked) {
    //     return "";
    //   } else {
    //     return bredList;
    //   }
    // }

    // // показ списка галлюцинации
    // let gallNameArr = cicleFn(dataBase, "gall"); 

    // let gallList = gallNameArr.map(item => (
    //   <div key={item} className="list__item">
    //     <Checkbox 
    //     checked = {this.props.psystatus[item].isChecked}
    //     onChange = {this.props.toggleSymptom}
    //     name = {item}
    //     label = {dataBase[item].label}
    //   />
    //   </div>
    // ));

    // let gallListShow = () => {
    //   if(this.props.psystatus["gallOtkl"].isChecked) {
    //     return "";
    //   } else {
    //     return gallList;
    //   }
    // }
    
    return <div>


     1
      
    </div>;
  }
}