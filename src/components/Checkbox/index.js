import React, { Component } from 'react';

export default class Checkbox extends Component {
  
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