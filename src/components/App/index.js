import React, { Component } from "react";
import "./App.css";
import update from 'immutability-helper';
// import {actions} from "./actions/caseActions.js";
// import { connect } from "react-redux";

class List extends Component {

  render() {
    const filteredList = this.props.psystatus.map((item)=>{
      if(item.isChecked) {
        return <div key={item.name} >{item.phrase}</div>;
      }
    });
      return <div>{filteredList}</div>; 
  }
}

class Checkbox extends Component {
  
  render() {
    return (
      <label>
        <input type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
          data-id={this.props.psindex}
        />
        {this.props.label}
       </label>
    );
  }
}

class Manager extends Component {

  render() {
    const filteredCheckboxList = this.props.psystatus.map((item, i)=>{
      return <div key={item.name}>
        <Checkbox onChange={this.props.onChange} checked={item.isChecked}  label={item.label} psindex={i}  /> 
      </div>;
    });
    return <div>{filteredCheckboxList}</div>; 
  }
}

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        psystatus: [
          { name: "wellcome",
            label: "Приветствие",
            isChecked: true,
            phrase: "Добро пожаловать на сайт!"
          },
          { name: "option1",
            label: "Свойство 1",
            isChecked: true,
            phrase: "Описание свойства 1"
          },
          { name: "option2",
            label: "Свойство 2",
            isChecked: true,
            phrase: "Описание свойства 2"
          }        
        ]

      };
  }

  toggleChange = (e) => {
    console.log(e.target.dataset.id); 
    const index = e.target.dataset.id;
    const newState = update(this.state, {psystatus: {[index]: {isChecked: {$set: !this.state.psystatus[index].isChecked}}}});   
    this.setState(newState);
  }

  render() {
    return <div>
      <table width="100%">
        <tbody>
        <tr>
          <td className="options"  width="50%">
            <Manager onChange={this.toggleChange} psystatus={this.state.psystatus} />            
          </td>
          <td className="status"  width="50%">
            <List psystatus={this.state.psystatus} />
          </td>
        </tr>
        </tbody>
      </table> 
    </div>;
  }
}

