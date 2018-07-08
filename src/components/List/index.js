import React, { Component } from 'react';
import cicleFn from "../../fn/cicleFn";

export default class List extends Component {

  render() {
    const {name, dataObj, psystatus} = this.props;

    // получаем список элементов, относящихся к этому циклу
    let arrayFromName = cicleFn(dataObj, name);

    // получаем список активных элементов
    const filteredNameArr = arrayFromName.filter((item)=>psystatus[item].isChecked);

    // перебираем пункты, расставляем запятые
    let filteredList = filteredNameArr.map((item, i)=>{
      if(i < filteredNameArr.length - 1) {
        return <span key={item} >{dataObj[item].phrase}, </span>
      } 
        return <span key={item} >{dataObj[item].phrase}</span>
    });

    // получаем фразы для начала и конца цикла, фразу для отсутствия данных
    let before = this.props.before || (name + "Before");
    let after = this.props.after || (name + "After");
    let noList = this.props.before || (name + "Not");

    // добавляем начало и конец фразы, фразу для отсутствия данных 
    if (filteredList.length) {
      if (dataObj[before].phrase) {
        filteredList.unshift(<span key={before} >{dataObj[before].phrase}</span>); 
      } else {
        console.warn("Нет фразы перед циклом " + name);
      }
      if (dataObj[after].phrase) {
        filteredList.push(<span key={after} >{dataObj[after].phrase}</span>); 
      } else {
        console.warn("Нет фразы после цикла " + name);
      }    
    } else {
      if(dataObj[noList].phrase) {
        filteredList = <span key={noList} >{dataObj[noList].phrase}</span>;
      } else {
        console.warn("Нет фразы отсутствия в цикле " + name);
      }      
    } 

    return <span>{filteredList}</span>; 
  }
}