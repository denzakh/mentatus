import React, { Component } from "react";
import { cicleKeys } from "../../lib/text";
import Checkbox from "../Checkbox";

/*
CheckboxGroup
список чекбоксов одного цикла

принимает:
cicle - имя цикла в dataBase
dataBase - объект БД
itemClassName - класс обёртки пункта (по умолчанию list__item)
autoKritika - значение критики, проставляемое при выборе поля

Состояние каждого пункта компонент берёт из стора сам (Checkbox),
поэтому группа не перерисовывается при изменении выбора.
*/

export default class CheckboxGroup extends Component {
  render() {
    const { cicle, dataBase, itemClassName, autoKritika } = this.props;

    return cicleKeys(dataBase, cicle).map(key => (
      <div key={key} className={itemClassName || "list__item"}>
        <Checkbox name={key} dataBase={dataBase} autoKritika={autoKritika} />
      </div>
    ));
  }
}
