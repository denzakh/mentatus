
import { buildRadioPhrase } from "../../lib/text";
import { fieldOf, useAppSelector } from "../../lib/redux";
import type { FieldViewOwnProps } from "../../types/components";

/*
OnePraseFromRadio
компонент представления

принимает:
name - имя радиогруппы
dataObj - объект БД для этой категории (например, данные по настроению)

из стора берёт: номер выбранного пункта группы и пол пациента
возвращает: название радиогруппы + значение выбранного пункта
*/

export default function OnePraseFromRadio(props: FieldViewOwnProps) {
  const { name, dataObj } = props;

  const phrase = useAppSelector(state => {
    const field = fieldOf(state, name);
    const pol = fieldOf(state, "pol");

    return buildRadioPhrase(
      dataObj && dataObj[name],
      field ? field.number : 0,
      !!(pol && pol.isChecked)
    );
  });

  return <span>{phrase}</span>;
}
