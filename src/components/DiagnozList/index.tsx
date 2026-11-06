import SectionLink from "../SectionLink";

import { fieldOf, useAppSelector } from "../../lib/redux";
import type { ListOwnProps } from "../../types/components";

export default function DiagnozList(props: ListOwnProps) {
  const mkb10 = useAppSelector(state => {
    const field = fieldOf(state, "diagnozMkb10");
    return field && field.text;
  });
  const klin = useAppSelector(state => {
    const field = fieldOf(state, "diagnozKlin");
    return field && field.text;
  });
  const dopolnenie = useAppSelector(state => {
    const field = fieldOf(state, "diagnozDopolnenie");
    return field && field.text;
  });
  const reqilech = useAppSelector(state => {
    const field = fieldOf(state, "reqilech");
    return field && field.text;
  });

  const diagnozText = () => {
    if (!mkb10 && !klin && !dopolnenie) {
      return null;
    }

    return (
      <p>
        <span> Диагноз: </span>
        {mkb10 ? <span>F {mkb10} &nbsp;</span> : null}
        <span>{klin} &nbsp;</span>
        {dopolnenie ? (
          <span>
            <br />
            {dopolnenie} &nbsp;
          </span>
        ) : null}
      </p>
    );
  };

  const reqText = () => {
    if (!reqilech) {
      return null;
    }

    return (
      <p>
        <span> Рекомендовано: </span> <br />
        <span className="pre">{reqilech} &nbsp;</span>
      </p>
    );
  };

  return (
    <SectionLink section="diagnoz" as="div" onToggle={props.toggleTab}>
      {diagnozText()}
      {reqText()}
    </SectionLink>
  );
}
