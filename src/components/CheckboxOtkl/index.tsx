
import { setSymptom } from "../../actions/fieldActions";
import { fieldOf, useAppDispatch, useAppSelector } from "../../lib/redux";
import CheckboxView from "../Checkbox/CheckboxView";
import type { FieldOwnProps } from "../../types/components";
import "./CheckboxOtkl.css";

/*
CheckboxOtkl
чекбокс «пункт отклонён / не оценивался», привязанный к полю стора

принимает:
name - имя поля в сторе
dataBase - объект БД для подписи
label - своя подпись

Разметку рисует общий `CheckboxView` (variant="otkl").
*/

export default function CheckboxOtkl(props: FieldOwnProps) {
  const { name, dataBase, label } = props;
  const dispatch = useAppDispatch();

  const checked = useAppSelector(state => {
    const field = fieldOf(state, name);
    return !!(field && field.isChecked);
  });

  const caption =
    label || (dataBase && dataBase[name] ? dataBase[name].label : "");

  const handleChange = () => {
    dispatch(setSymptom(name));
  };

  return (
    <CheckboxView
      name={name}
      label={caption}
      checked={checked}
      variant="otkl"
      onChange={handleChange}
    />
  );
}
