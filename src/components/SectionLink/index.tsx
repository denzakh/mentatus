import type { KeyboardEvent, ReactNode } from "react";
import type { SectionName } from "../../types/status";
import type { ToggleTabHandler } from "../../types/components";

/*
SectionLink
обёртка узла заключения: клик и Enter/Space открывают раздел

Разметка остаётся прежней (<span> или <div> с data-id), добавляются только
role/tabIndex и обработка клавиатуры — поэтому внешний вид не меняется.
*/

interface Props {
  section: SectionName;
  onToggle?: ToggleTabHandler;
  className?: string;
  as?: "span" | "div";
  children: ReactNode;
}

export default function SectionLink(props: Props) {
  const { section, onToggle, className, as = "span", children } = props;

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (onToggle) {
        onToggle(event);
      }
    }
  };

  const common = {
    className,
    "data-id": section,
    role: "button",
    tabIndex: 0,
    onClick: onToggle,
    onKeyDown: handleKeyDown
  } as const;

  if (as === "div") {
    return <div {...common}>{children}</div>;
  }

  return <span {...common}>{children}</span>;
}