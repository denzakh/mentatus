import React, { Component } from 'react';
import "./RadioList.css";

export default class RadioList extends Component {
  
  render() {

    let dataBase = this.props.dataBase;
    let name = this.props.name; 
    let arr = this.props.dataBase[name].data;
    let number = this.props.dataBase[name];
    let psystatus = this.props.psystatus;
    
    return (
      <div className="radio__list">
        {arr.map(item => (
          <div key={item.id} className="radio__item">
            <input 
              type="radio" 
              name={name} 
              id={name + item.id} 
              value={item.id} 
              className="radio__input" 
              onChange={this.props.onChange} 
              checked={+item.id == +psystatus[name].number}
            />
            <label className="radio__label" htmlFor={name + item.id}>
              {item.label}
            </label>                        
          </div>
        ))}
      </div>
    );
  }
}
