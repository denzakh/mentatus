
import { cicleKeys } from "../../lib/text";
import Checkbox from "../Checkbox";
import type { Schema } from "../../types/schema";

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

interface Props {
  cicle: string;
  dataBase: Schema;
  itemClassName?: string;
  autoKritika?: number;
}

export default function CheckboxGroup(props: Props) {
  const { cicle, dataBase, itemClassName, autoKritika } = props;

  if (!cicle) {
    return null;
  }

  return cicleKeys(dataBase, cicle).map(key => (
    <div key={key} className={itemClassName || "list__item"}>
      <Checkbox name={key} dataBase={dataBase} autoKritika={autoKritika} />
    </div>
  ));
}
