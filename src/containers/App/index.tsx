import React, { Component } from "react";
import "./App.css";
import "./Print.css";
import TabMenu from "../../components/TabMenu";
import TabRender from "../../components/TabRender";
import Conclusion from "../../components/Conclusion";

/*
App
раскладка рабочего экрана: меню разделов, форма раздела и заключение

Состояние полей живёт в сторе, поэтому App держит только
локальное состояние активного раздела и не перерисовывается при вводе.
*/

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: "sostoyanie" };
  }

  toggleTab = e => {
    const name = e.currentTarget.getAttribute("data-id");
    this.setState({ activeTab: name });
  };

  render() {
    return (
      <div className="app">
        <div className="app__row">
          <nav className="app__menu">
            <div className="app__menu-title">Разделы</div>
            <TabMenu
              activeTab={this.state.activeTab}
              toggleTab={this.toggleTab}
            />
          </nav>
          <div className="app__content">
            <main className="app__content-row">
              <div className="app__manager">
                <TabRender activeTab={this.state.activeTab} />
              </div>
              <div className="app__conclusion">
                <Conclusion toggleTab={this.toggleTab} />
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
}
