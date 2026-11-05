import React from "react";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function Header(props: Props) {
  return <header className="header">{props.children}</header>;
}
