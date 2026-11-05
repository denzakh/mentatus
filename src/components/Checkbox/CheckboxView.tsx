

/*
CheckboxView
презентационный чекбокс: разметка общая для Checkbox, CheckboxOtkl
и CheckboxPol (состояние передаёт обёртка)

принимает:
name     - имя поля в сторе (оно же name/id чекбокса)
checked  - включён ли чекбокс
label    - подпись (у variant="pol" не используется)
variant  - "default" | "otkl" (пункт отклонён) | "pol" (переключатель пола)
onChange - переключение
*/

export type CheckboxVariant = "default" | "otkl" | "pol";

interface Props {
  name: string;
  checked: boolean;
  label?: string;
  variant?: CheckboxVariant;
  onChange: () => void;
}

// подписи переключателя пола — дословно как в прежнем CheckboxPol
// (два пробела перед стрелкой)
export const POL_LABEL_MALE = "Пол: мужской  ⇄";
export const POL_LABEL_FEMALE = "Пол: женский  ⇄";

export default function CheckboxView(props: Props) {
  const { name, checked, label, variant = "default", onChange } = props;

  if (variant === "otkl") {
    const id = "checkbox-otkl-" + name;

    return (
      <span className="checkbox-otkl">
        <input
          type="checkbox"
          className="checkbox-otkl__input"
          checked={checked}
          onChange={onChange}
          name={name}
          id={id}
        />
        <label className="checkbox-otkl__label" htmlFor={id}>
          {label}
        </label>
      </span>
    );
  }

  if (variant === "pol") {
    const id = "checkbox-pol-" + name;

    return (
      <span>
        <input
          type="checkbox"
          className="checkbox__input"
          checked={checked}
          onChange={onChange}
          name={name}
          id={id}
        />
        <label className="checkbox__pol" htmlFor={id}>
          {checked ? POL_LABEL_MALE : POL_LABEL_FEMALE}
        </label>
      </span>
    );
  }

  const id = "checkbox-" + name;

  return (
    <span>
      <input
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        onChange={onChange}
        name={name}
        id={id}
      />
      <label className="checkbox__label" htmlFor={id}>
        {label}
      </label>
    </span>
  );
}
