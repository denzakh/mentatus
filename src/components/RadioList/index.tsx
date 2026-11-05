import { setRadio } from "../../actions/fieldActions";
import {
  radioOptionsOf,
  radioSelectedOf,
  useAppDispatch,
  useAppSelector
} from "../../lib/redux";
import RadioOptions from "../RadioOptions";
import type { Schema } from "../../types/schema";
import "./RadioList.css";

/*
RadioList
группа радиокнопок, привязанная к полю стора

принимает:
name - имя поля в сторе
dataBase - объект БД, в котором лежит группа (label + data)

Разметку рисует общий `RadioOptions`; здесь только чтение стора и диспатч.
*/

interface OwnProps {
  name: string;
  dataBase?: Schema;
}

export default function RadioList(props: OwnProps) {
  const { name, dataBase } = props;
  const dispatch = useAppDispatch();

  // пункты группы лежат в схеме, поэтому ссылка на массив не меняется
  const options = useAppSelector(state =>
    radioOptionsOf(name, dataBase)
  );
  const selected = useAppSelector(state => radioSelectedOf(state, name));

  const handleChange = (value: number) => {
    dispatch(setRadio(name, value));
  };

  return (
    <RadioOptions
      name={name}
      options={options}
      selected={selected}
      onChange={handleChange}
    />
  );
}
