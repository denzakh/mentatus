import React from "react";
import App from "../App";
import Option from "../Option";
import Repository from "../Repository";

let pages = [
  {
    name: "Status",
    title: "Статус",
    component: <App />
  },
  {
    name: "Option",
    title: "Настройки",
    component: <Option />
  },
  {
    name: "Repository",
    title: "Заключения",
    component: <Repository />
  }
];

export default pages;
