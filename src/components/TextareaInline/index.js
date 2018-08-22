import React, { Component } from 'react';
import "./TextareaInline.css";

export default class TextareaInline extends Component {
  
  render() {
    return (
      <div className="textarea-inline"> 
        <div className="textarea-inline__label">{this.props.label}</div>
        <textarea 
          className="textarea-inline__input"
          onChange={this.props.onChange}
          name={this.props.name}   
          defaultValue={this.props.value} 
        ></textarea> 
      </div>  
    );
  }
}