import React, { Component } from 'react';
import "./RadioList.css";

export default class RadioList extends Component {
  
  render() {

    let dataBase = this.props.dataBase;
    let name = this.props.name; 
    let arr = this.props.dataBase[name].data;   
    
    return (
      <div className="radio__list">
        {arr.map(item => (
          <div key={item.id} className="radio__item">
            <input type="radio" name={name} id={name + item.id} value={item.id} className="radio__input" />
            <label className="radio__label" for={name + item.id}>
              {item.label}
            </label>                        
          </div>
        ))}
      </div>
    );
  }
}


/*
<input type="checkbox" className="checkbox__input"
            checked={this.props.checked}
            onChange={this.props.onChange}
            name={this.props.name}
            id={this.props.name}
          />
        <label className="checkbox__label" htmlFor={this.props.name}>{this.props.label}</label>
*/