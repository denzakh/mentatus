import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./App.css";
import "./Print.css";
import TabMenu from "../../components/TabMenu";
import TabRender from "../../components/TabRender";
import Conclusion from "../../components/Conclusion";
import AboutPage from "../../components/AboutPage";
import HelpPage from "../../components/HelpPage";
import type { ToggleTabHandler } from "../../types/components";

/*
App
раскладка рабочего экрана: меню разделов, форма раздела и заключение,
а также информационные страницы «О проекте» и «Помощь»

Состояние полей живёт в сторе, поэтому App держит только
локальное состояние активного раздела (useState) и не перерисовывается
при вводе.

Страницы переключаются локальным состоянием `page` (роутера в проекте нет):
заголовок `app__title` возвращает на рабочий экран, пункты шапки открывают
«О проекте» и «Помощь». Выбор раздела в меню тоже возвращает на рабочий
экран — раздел и заполненные поля при этом сохраняются.

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

// активная страница: рабочий экран или информационная страница
type PageName = "work" | "about" | "help";
type InfoPageName = Exclude<PageName, "work">;

// пункты шапки — в порядке вывода
const infoPages: { name: InfoPageName; title: string }[] = [
  { name: "about", title: "О проекте" },
  { name: "help", title: "Помощь" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("sostoyanie");

  // открытая страница; по умолчанию — рабочий экран
  const [page, setPage] = useState<PageName>("work");

  // переключение между вводом и заключением (только мобильный режим)
  const [showConclusion, setShowConclusion] = useState(false);
  const toggleContent = () => {
    setShowConclusion(prev => !prev);
  };

  // раздел берётся из `data-id` пункта меню или заключения;
  // выбор раздела всегда возвращает на рабочий экран
  const toggleTab: ToggleTabHandler = e => {
    const name = e.currentTarget.getAttribute("data-id");
    if (name) {
      setActiveTab(name);
      setPage("work");
      setShowConclusion(false);
    }
  };

  // мобильный режим с реакцией на изменение размера окна
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // рабочий экран: на мобильном — форма или заключение, на десктопе — обе колонки
  const workScreen = isMobile ? (
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
  );

  return (
    <div className="app">
      <div className="app__row">
        <nav className="app__menu app__menu-mobile">
          <div className="app__menu-title">Разделы</div>
          <TabMenu activeTab={activeTab} toggleTab={toggleTab} />
        </nav>

        {/* Кнопка переключения между вводом и заключением (только рабочий экран,
            на десктопе скрыта через CSS) */}
        {page === "work" ? (
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
        ) : null}

        <div className={`app__content`}>
          <div className="app__header">
            <h1 className="app__title">
              <button
                type="button"
                className="app__title-btn"
                data-id="home"
                title="На главную"
                onClick={() => setPage("work")}
              >
                Ментатус
              </button>
            </h1>
            <nav className="app__header-menu" aria-label="Информация">
              {infoPages.map(item => (
                <button
                  type="button"
                  key={item.name}
                  data-id={item.name}
                  className={classNames({
                    "app__header-menu-item": true,
                    "is-active": page === item.name
                  })}
                  aria-current={page === item.name ? "page" : undefined}
                  onClick={() => setPage(item.name)}
                >
                  {item.title}
                </button>
              ))}
            </nav>
          </div>
          <main className="app__content-row">
            {page === "work" ? (
              workScreen
            ) : (
              <div className="app__page">
                {page === "about" ? <AboutPage /> : <HelpPage />}
              </div>
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
