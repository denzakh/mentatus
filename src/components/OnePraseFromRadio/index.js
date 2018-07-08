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

    let label = dataObj[name].label;
    let index = psystatus[name].number;
    let phrase = dataObj[name].data[index].phrase;

    let оnePrase = label + " " + phrase;

    return <span>{оnePrase}</span>; 
  }
}