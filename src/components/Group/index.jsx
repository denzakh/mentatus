import React from "react";
import CheckboxGroup from "../CheckboxGroup";

/*
Group
группа чекбоксов одного цикла схемы раздела

принимает:
cicle - имя цикла (поле `cicle` у полей схемы)
dataBase - схема раздела
itemClassName / autoKritika - пробрасываются в CheckboxGroup
*/
export default function Group(props) {
  const { cicle, dataBase, itemClassName, autoKritika } = props;

  return (
    <CheckboxGroup
      cicle={cicle}
      dataBase={dataBase}
      itemClassName={itemClassName}
      autoKritika={autoKritika}
    />
  );
}
