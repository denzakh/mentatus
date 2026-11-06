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
        <button
          className="app__toggle-btn"
          type="button"
          onClick={toggleContent}
          aria-label={showConclusion ? "К вводу" : "К заключению"}
        >
          {showConclusion ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5a2.12 2.12 0 0 1 3-3" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          )}
        </button>

        <div className={`app__content`}>
          <div className="app__header">
            <h1 className="app__title">Ментатус</h1>
            <div className="app__header-menu">
              <div className="app__header-menu-item">О проекте</div>
              <div className="app__header-menu-item">Помощь</div>
            </div>
          </div>
          <main className="app__content-row">
            {isMobile ? (
              showConclusion ? (
                <div className="app__conclusion">
                  <Conclusion toggleTab={toggleTab} />
                </div>
              ) : (
                <div className="app__manager">
                  <TabRender activeTab={activeTab} />
                </div>
              )
            ) : (
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
