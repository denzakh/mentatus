import React, { Component } from 'react';
import cicleFn from "../../fn/cicleFn";

export default class ListOfSentences extends Component {

  render() {
    const {name, dataObj, psystatus} = this.props;

    // получаем список элементов, относящихся к этому циклу
    let arrayFromName = cicleFn(dataObj, name);

    // получаем список активных элементов
    const filteredNameArr = arrayFromName.filter((item)=>psystatus[item].isChecked);

    // перебираем пункты, расставляем запятые
    let filteredList = filteredNameArr.map((item, i)=>{
      return <span key={item} >{dataObj[item].phrase}. </span>
    });


    return <span>{filteredList}</span>; 
  }
}