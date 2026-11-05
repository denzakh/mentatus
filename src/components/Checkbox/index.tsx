
import { setSymptom, setRadio } from "../../actions/fieldActions";
import { isKritikaEmpty } from "../../lib/rules/kritika";
import { fieldOf, useAppDispatch, useAppSelector } from "../../lib/redux";
import CheckboxView from "./CheckboxView";
import type { FieldOwnProps } from "../../types/components";
import "./Checkbox.css";

/*
Checkbox
чекбокс, привязанный к полю стора

принимает:
name - имя поля в сторе
dataBase - объект БД для подписи (не нужен, если задан label)
label - своя подпись
autoKritika - значение критики, которое проставляется при выборе поля

Разметку рисует общий `CheckboxView` (variant="default"); значение поля,
подпись и признак пустой критики читаются хуками из `lib/redux`.
*/

export default function Checkbox(props: FieldOwnProps) {
  const { name, dataBase, label, autoKritika } = props;
  const dispatch = useAppDispatch();

  const checked = useAppSelector(state => {
    const field = fieldOf(state, name);
    return !!(field && field.isChecked);
  });

  // авто-критика выставляется только пока она пустая
  const isKritikaEmptyValue = useAppSelector(state =>
    isKritikaEmpty(fieldOf(state, "kritika"))
  );

  const caption =
    label || (dataBase && dataBase[name] ? dataBase[name].label : "");

  const handleChange = () => {
    if (autoKritika !== undefined && isKritikaEmptyValue) {
      dispatch(setRadio("kritika", autoKritika));
    }

    dispatch(setSymptom(name));
  };

  return (
    <CheckboxView
      name={name}
      label={caption}
      checked={checked}
      variant="default"
      onChange={handleChange}
    />
  );
}
