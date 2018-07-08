import React, { Component } from 'react';

export default class Text extends Component {



  render() {

    console.dir(this.props.text);     
    return <span> {this.props.text.text}</span>
  }
}