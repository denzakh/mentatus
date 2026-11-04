import React, { Component } from "react";
import cicleFn from "../../fn/cicleFn";

export default class ListOfWords extends Component {
  render() {
    const { name, dataObj, psystatus, beforeText } = this.props;
    const isAnd = !!this.props.isAnd;

    // получаем список элементов, относящихся к этому циклу
    let arrayFromName = cicleFn(dataObj, name);

    // получаем список активных элементов
    const filteredNameArr = arrayFromName.filter(item => {
      return psystatus[item] && psystatus[item].isChecked;
    });

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
    let noList = this.props.noList || name + "Not";

    // фраза-начало цикла: явный текст приоритетнее фразы из базы
    let beforePhrase =
      beforeText || (dataObj[before] ? dataObj[before].phrase : "");

    // добавляем начало и конец фразы, фразу для отсутствия данных
    if (filteredList.length) {
      if (beforePhrase) {
        filteredList.unshift(<span key={before}>{beforePhrase}</span>);
      }
      if (dataObj[after] && dataObj[after].phrase) {
        filteredList.push(<span key={after}>{dataObj[after].phrase}</span>);
      }
    } else {
      if (dataObj[noList] && dataObj[noList].phrase) {
        filteredList = <span key={noList}>{dataObj[noList].phrase}</span>;
      }
    }

    return <span>{filteredList}</span>;
  }
}
