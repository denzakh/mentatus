import React, { Component } from "react";
import cicleFn from "../../fn/cicleFn";
import dataObj from "../../store/sostoyanieData.js";
export default class ListOfWords extends Component {
  render() {
    const psystatus = this.props.psystatus;
    const isAnd = true;
    const name = "zatrud";

    // получаем список элементов, относящихся к этому циклу
    let arrayFromName = cicleFn(dataObj, name);

    // получаем список активных элементов
    const filteredNameArr = arrayFromName.filter(
      item => psystatus[item].isChecked
    );

    // перебираем пункты, расставляем запятые
    let filteredList = filteredNameArr.map((item, i) => {
      let ifAnd = "";
      if (i === filteredNameArr.length - 1) {
        // последняя фраза
        ifAnd = "";
      } else {
        // если включен "и"
        // и фраза предпоследняя
        // и массив более 1
        if (
          isAnd &&
          i === filteredNameArr.length - 2 &&
          filteredNameArr.length > 1
        ) {
          ifAnd = " и ";
        } else {
          ifAnd = ", ";
        }
      }
      return (
        <span key={item}>
          {dataObj[item].phrase}
          {ifAnd}
        </span>
      );
    });

    // получаем фразы для начала и конца цикла, фразу для отсутствия данных
    let before = this.props.before || name + "Before";
    let after = this.props.after || name + "After";
    let noList = this.props.before || name + "Not";

    let beforeText = () => {
      console.log(psystatus.kontakt.number);
      if (true) {
        return ", но он затруднен из-за ";
      } else {
        return dataObj[before].phrase;
      }
    };

    // добавляем начало и конец фразы, фразу для отсутствия данных
    if (filteredList.length) {
      if (dataObj[before].phrase) {
        filteredList.unshift(<span key={before}>{beforeText()}</span>);
      }
      if (dataObj[after].phrase) {
        filteredList.push(<span key={after}>{dataObj[after].phrase}</span>);
      }
    } else {
      if (dataObj[noList].phrase) {
        filteredList = <span key={noList}>{dataObj[noList].phrase}</span>;
      }
    }

    return <span>{filteredList}</span>;
  }
}
