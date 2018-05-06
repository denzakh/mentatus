import React, { Component } from 'react';
import "./Textarea.css";

export default class Textarea extends Component {
  
  render() {
    return (
      <textarea 
        className="textarea__input"
        onChange={this.props.onChange}
        name={this.props.name}        
      ></textarea>   
    );
  }
}