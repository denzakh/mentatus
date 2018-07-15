import React, { Component } from 'react';

export default class FreeTextBeforeAndAfter extends Component {

  render() {  
    const {name, dataObj, psystatus} = this.props;
    let before = dataObj[name].before;
    let after = dataObj[name].after;
    let text = psystatus[name].text;
    let allText = before + text + after;
    return <span>
      {allText}
    </span>
  }
}