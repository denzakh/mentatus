import React from "react";
import CurrentStatus from "../CurrentStatus";
import Option from "../Option";
import Repository from "../Repository";

let pages = [
  {
    name: "Status",
    title: "Текущий статус",
    component: <CurrentStatus />
  },
  {
    name: "Repository",
    title: "Заключения",
    component: <Repository />
  },
  {
    name: "Option",
    title: "Настройки",
    component: <Option />
  }
];

export default pages;
