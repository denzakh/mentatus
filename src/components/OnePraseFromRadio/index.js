import React, { Component } from 'react';

/*
OnePraseFromRadio
компонент представления

принимает:
name - имя радиогруппы 
dataObj - объект БД для этой категории (например, даные по настроению) 
psystatus - store

возвращает: название радиогруппы + значение выбранного пункта

*/

export default class OnePraseFromRadio extends Component {

  render() {
    const {name, dataObj, psystatus} = this.props;

    let index = psystatus[name].number;
    let phrase = dataObj[name].data[index].phrase;

    let before;
    if(dataObj[name].before === undefined) {
      before = "";
    } else {
      before = dataObj[name].before;
    }

    let after;
    if(dataObj[name].after === undefined) {
      after = "";
    } else {
      after = dataObj[name].after;
    }

    let оnePrase = before + phrase + after;

    return<span>{оnePrase}</span>; 
  }
}