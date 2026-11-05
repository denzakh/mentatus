
import { fieldOf, useAppSelector } from "../../lib/redux";
import type { FieldViewOwnProps } from "../../types/components";

/*
FreeText
компонент представления: свободный текст поля

принимает:
name - имя поля в сторе

из стора берёт: значение поля
*/

export default function FreeText(props: FieldViewOwnProps) {
  const { name } = props;

  const value = useAppSelector(state => {
    const field = fieldOf(state, name);
    return (field && field.text) || "";
  });

  return <span> {value}</span>;
}
