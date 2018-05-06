import React, { Component } from 'react';
import "./Textarea.css";

export default class Textarea extends Component {
  
  render() {
    return (
      <textarea 
        className="textarea__input"
        onChange={this.props.onChange}
        field={this.props.field}
      >{this.props.text}</textarea>   
    );
  }
}