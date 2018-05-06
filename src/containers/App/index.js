import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import classNames from 'classnames';
import {setSymptom} from '../../actions/symptomAction.js';
import {setText} from '../../actions/textAction.js';

import ZhalobyManager from "../../components/ZhalobyManager";
import ZhalobyList from "../../components/ZhalobyList";
import AnamnezManager from "../../components/AnamnezManager";
import AnamnezList from "../../components/AnamnezList";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {activeTab: "zhaloby"};
  }

  toggleSymptom = (e) => {
    const name = e.target.name;
    this.props.setSymptom(name);
  }

  toggleText = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.setText(name, value);
  }

  toggleTab = (e) => {
    const name = e.currentTarget.title;
    console.log(name); 
    this.setState({activeTab: name});
  }

  render() {
    const psystatus = this.props.psystatus;

    let tabsMenu = [
      { name: "zhaloby",
        symbol: "Ж",
        label: "Жалобы"
      },
      { name: "anamnez",
        symbol: "А",
        label: "Анамнез"
      }
    ];
    
    let tabMenuRender = tabsMenu.map((item)=>{
      let tabClass = classNames({
        'app__tab-menu-item': true,
        'is-active': item.name === this.state.activeTab
      });
      return <div 
        onClick={this.toggleTab} 
        title={item.name} 
        key={item.name} 
        className={tabClass} 
      >
        <div className="app__tab-symbol">
          {item.symbol}
        </div>
        <div className="app__tab-label">
          {item.label}
        </div>
      </div>
    })

    let tabs = [
      <div key="zhaloby" name="zhaloby">
        <ZhalobyManager toggleSymptom={this.toggleSymptom} toggleText={this.toggleText} psystatus={psystatus} />
      </div>,
      <div key="anamnez" name="anamnez">
        <AnamnezManager key="anamnez" toggleSymptom={this.toggleSymptom} toggleText={this.toggleText} psystatus={psystatus} />
      </div>
    ]

    let tabRender = tabs.filter((item)=>{
      return item.key === this.state.activeTab      
    })

    console.log(tabRender); 
  
    return <div className="app">
      <table width="100%" className="app__table">
        <tbody>
        <tr>
          <td className="app__td app__td--tab-menu"  width="60">
            <div className="app__tab-menu-title">Разделы</div>
            {tabMenuRender}
          </td>
          <td className="app__td app__td--options"  width="30%">
            {tabRender}
          </td>
          <td className="app__td app__td--status"  width="60%">
            <div className="app__status-box">              
              <ZhalobyList psystatus={psystatus} /> 
              <AnamnezList psystatus={psystatus} /> 
            </div>
          </td>
        </tr>
        </tbody>
      </table> 
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    psystatus: state.psystatus,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSymptom: bindActionCreators(setSymptom, dispatch),
    setText: bindActionCreators(setText, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

