import React, { Component } from "react";
import "./App.css";
import "./Print.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSymptom } from "../../actions/symptomAction";
import { setText } from "../../actions/textAction";
import { setRadio } from "../../actions/radioAction";
import TabMenu from "../../components/TabMenu";
import TabRender from "../../components/TabRender";
import Conclusion from "../../components/Conclusion";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: "sostoyanie" };
  }

  toggleSymptom = e => {
    const name = e.target.name;
    this.props.setSymptom(name);
  };

  toggleText = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.setText(name, value);
  };

  toggleRadio = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.setRadio(name, +value);
  };

  toggleTab = e => {
    const name = e.currentTarget.getAttribute("data-id");
    // console.log(name);
    this.setState({ activeTab: name });
  };

  render() {
    const psystatus = this.props.psystatus;

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
                <TabRender
                  activeTab={this.state.activeTab}
                  toggleTab={this.toggleTab}
                  toggleSymptom={this.toggleSymptom}
                  toggleText={this.toggleText}
                  toggleRadio={this.toggleRadio}
                  psystatus={psystatus}
                />
              </div>
              <div className="app__conclusion">
                <Conclusion psystatus={psystatus} toggleTab={this.toggleTab} />
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

function mapStateToProps(state) {
  return {
    psystatus: state.psystatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSymptom: bindActionCreators(setSymptom, dispatch),
    setText: bindActionCreators(setText, dispatch),
    setRadio: bindActionCreators(setRadio, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
