import React, { Component } from 'react';
import "./RadioListInline.css";

export default class RadioListInline extends Component {
  
  render() {

    let dataBase = this.props.dataBase;
    let name = this.props.name; 
    let arr = dataBase[name].data;
    let label = dataBase[name].label;
    let psystatus = this.props.psystatus;
    
    return (
      <div className="radio__inline">
        <div  className="radio__inline-label">{label} </div>
        <div className="radio__inline-list">
        {arr.map(item => (
          <div key={item.id} className="radio__inline-item">
            <input 
              type="radio" 
              name={name} 
              id={name + item.id} 
              value={item.id} 
              className="radio__input" 
              onChange={this.props.onChange} 
              checked={+item.id === +psystatus[name].number}
            />
            <label className="radio__label" htmlFor={name + item.id}>
              {item.label}
            </label>                        
          </div>
        ))}
        </div>
      </div>
    );
  }
}
