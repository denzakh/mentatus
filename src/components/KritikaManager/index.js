import React, { Component } from 'react';
import dataBase from "../../store/sostoyanieData.js";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import cicleFn from "../../fn/cicleFn";
// import "./Pp.css";

export default class KritikaManager extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {   
    
    return <div>

      <div className="list__title">Критика:</div>
      <RadioList 
        name="kritika" 
        dataBase={dataBase} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />

      <Textarea
        onChange={this.props.toggleText}
        name="kritikaText"
        label="Описание критики"
        value={this.props.psystatus.kritikaText}
      />

           
    </div>;
  }
}