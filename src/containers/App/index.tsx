import React, { useEffect, useState } from "react";
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

Мобильный режим (@media max-width: 768px):
- левое меню `app__menu` уходит из потока и становится фиксированной
  нижней панелью со скроллом (класс `app__menu-mobile`);
- кнопка `app__toggle-btn` переключает показ между страницей ввода
  `app__manager` и заключением `app__conclusion`;
- контентная область получает отступ снизу (`app__content-mobile`),
  чтобы не прятаться под закреплённым меню.
На десктопе структура не меняется: меню слева, обе колонки контента
рядом.
*/

export default function App() {
  const [activeTab, setActiveTab] = useState("sostoyanie");

  // раздел берётся из `data-id` пункта меню или заключения
  const toggleTab: ToggleTabHandler = e => {
    const name = e.currentTarget.getAttribute("data-id");
    if (name) {
      setActiveTab(name);
    }
  };

  // переключение между вводом и заключением (только мобильный режим)
  const [showConclusion, setShowConclusion] = useState(false);
  const toggleContent = () => {
    setShowConclusion(prev => !prev);
  };

  // мобильный режим с реакцией на изменение размера окна
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="app">
      <div className="app__row">
        <nav className="app__menu app__menu-mobile">
          <div className="app__menu-title">Разделы</div>
          <TabMenu activeTab={activeTab} toggleTab={toggleTab} />
        </nav>

        {/* Кнопка переключения между вводом и заключением (видна только на мобильных через CSS) */}
        <button className="app__toggle-btn" type="button" onClick={toggleContent}>
          {showConclusion ? "К вводу" : "К заключению"}
        </button>

        <div className={`app__content${isMobile ? " app__content-mobile" : ""}`}>
          <main className="app__content-row">
            {isMobile
              ? showConclusion ? (
                  <div className="app__conclusion">
                    <Conclusion toggleTab={toggleTab} />
                  </div>
                ) : (
                  <div className="app__manager">
                    <TabRender activeTab={activeTab} />
                  </div>
                )
              : (
                <>
                  <div className="app__manager">
                    <TabRender activeTab={activeTab} />
                  </div>
                  <div className="app__conclusion">
                    <Conclusion toggleTab={toggleTab} />
                  </div>
                </>
              )}
          </main>
          <footer className="app__footer">
            Copyright 2021–{new Date().getFullYear()} Denis Zakharchenko
            <br />
            Licensed under the Apache License, Version 2.0
          </footer>
        </div>
      </div>
    </div>
  );
}
