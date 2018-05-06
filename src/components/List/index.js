import React, { Component } from 'react';

export default class List extends Component {

  render() {
    const {nameArr, dataObj, psystatus, before, after, noList} = this.props;
    const filteredNameArr = nameArr.filter((item)=>psystatus[item].isChecked);

    // перебираем пункты, расставляем запятые
    let filteredList = filteredNameArr.map((item, i)=>{
      if(i < filteredNameArr.length - 1) {
        return <span key={item} >{dataObj[item].phrase}, </span>
      } 
        return <span key={item} >{dataObj[item].phrase}</span>
    });

    // добавляем начало и конец фразы, фразу для отсутствия данных 
    if (filteredList.length) {
      filteredList.unshift(<span key={before} >{dataObj[before].phrase}</span>); 
      filteredList.push(<span key={after} >{dataObj[after].phrase}</span>); 
    } else {
      filteredList = <span key={noList} >{dataObj[noList].phrase}</span>;
    } 

    return <span>{filteredList}</span>; 
  }
}