import type { ReactNode } from "react";
import "./StaticPage.css";

/*
StaticPage
каркас информационной страницы: заголовок и текстовое содержимое

принимает:
title    - заголовок страницы
children - содержимое (абзацы, списки, подзаголовки)

Страницы «О проекте» и «Помощь» — статический текст, поэтому типографику
задаёт блок `.static-page`, а в разметке страниц классы не нужны.
*/

interface Props {
  title: string;
  children: ReactNode;
}

export default function StaticPage(props: Props) {
  const { title, children } = props;

  return (
    <article className="static-page">
      <h2 className="static-page__title">{title}</h2>
      {children}
    </article>
  );
}
