
import CheckboxGroup from "../CheckboxGroup";
import type { Schema } from "../../types/schema";

/*
Group
группа чекбоксов одного цикла схемы раздела

принимает:
cicle - имя цикла (поле `cicle` у полей схемы)
dataBase - схема раздела
itemClassName / autoKritika - пробрасываются в CheckboxGroup
*/

interface Props {
  cicle?: string;
  dataBase: Schema;
  itemClassName?: string;
  autoKritika?: number;
}

export default function Group(props: Props) {
  const { cicle, dataBase, itemClassName, autoKritika } = props;

  if (!cicle) {
    return null;
  }

  return (
    <CheckboxGroup
      cicle={cicle}
      dataBase={dataBase}
      itemClassName={itemClassName}
      autoKritika={autoKritika}
    />
  );
}
