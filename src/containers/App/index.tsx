import React, { useState } from "react";
import "./App.css";
import "./Print.css";
import TabMenu from "../../components/TabMenu";
import TabRender from "../../components/TabRender";
import Conclusion from "../../components/Conclusion";
import type { ToggleTabHandler } from "../../types/components";

/*
App
раскладка рабочего экрана: меню разделов, форма раздела и заключение

Состояние полей живёт в сторе, поэтому App держит только
локальное состояние активного раздела (useState) и не перерисовывается
при вводе.
*/

export default function App() {
  const [activeTab, setActiveTab] = useState("sostoyanie");

  // раздел берётся из `data-id` пункта меню или заключения
  const toggleTab: ToggleTabHandler = e => {
    const name = e.currentTarget.getAttribute("data-id");
    setActiveTab(name);
  };

  return (
    <div className="app">
      <div className="app__row">
        <nav className="app__menu">
          <div className="app__menu-title">Разделы</div>
          <TabMenu activeTab={activeTab} toggleTab={toggleTab} />
        </nav>
        <div className="app__content">
          <main className="app__content-row">
            <div className="app__manager">
              <TabRender activeTab={activeTab} />
            </div>
            <div className="app__conclusion">
              <Conclusion toggleTab={toggleTab} />
            </div>
          </main>
          <footer className="app__footer">
            Copyright 2021 Denis Zakharchenko
            <br />
            Licensed under the Apache License, Version 2.0
          </footer>
        </div>
      </div>
    </div>
  );
}
