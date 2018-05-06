import React, { Component } from 'react';

export default class Checkbox extends Component {
  
  render() {
    return (
      <label>
        <input type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
          name={this.props.name}
        />
        {this.props.label}
       </label>
    );
  }
}