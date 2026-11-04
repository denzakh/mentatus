import React from "react";
import App from "../../containers/App";

/*
ActivePage
страница приложения: сейчас она одна — рабочее место «Статус»

Раньше здесь был выбор из `containers/pages`, но страницы «Настройки»
и «Заключения» были заглушками, а активную страницу никто не переключал
(срез `option` не менялся). Заглушки и навигация удалены.
*/
export default function ActivePage() {
  return (
    <div className="wrapper__active-page">
      <App />
    </div>
  );
}
