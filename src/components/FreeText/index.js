import React, { Component } from 'react';

export default class Text extends Component {

  render() {  
    return <span> {this.props.text.text}</span>
  }
}