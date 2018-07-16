import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import classNames from 'classnames';
import {setSymptom} from '../../actions/symptomAction.js';
import {setText} from '../../actions/textAction.js';
import {setRadio} from '../../actions/radioAction.js';

import ZhalobyManager from "../../components/ZhalobyManager";
import ZhalobyList from "../../components/ZhalobyList";
import AnamnezManager from "../../components/AnamnezManager";
import AnamnezList from "../../components/AnamnezList";
// import Sostoyanie1Manager from "../../components/Sostoyanie1Manager";
// import Sostoyanie1List from "../../components/Sostoyanie1List";
// import Sostoyanie2Manager from "../../components/Sostoyanie2Manager";
// import Sostoyanie2List from "../../components/Sostoyanie2List";
import AffektManager from "../../components/AffektManager";
import AffektList from "../../components/AffektList";
// rech
import KognitManager from "../../components/KognitManager";
import KognitList from "../../components/KognitList";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {activeTab: "kognit"};
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

  toggleRadio = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.setRadio(name, +value);
  }

  toggleTab = (e) => {
    const name = e.currentTarget.getAttribute("data-id");
    console.log(name); 
    this.setState({activeTab: name});
  }

  render() {
    const psystatus = this.props.psystatus;

    let tabsMenu = [
      { name: "anamnez",
        symbol: "АH",
        label: "Анамнез"
      },
      { name: "zhaloby",
        symbol: "ЖЛ",
        label: "Жалобы"
      },
      { name: "sostoyanie1",
        symbol: "C1",
        label: "Состояние 1"
      },
      { name: "sostoyanie2",
        symbol: "С2",
        label: "Состояние 2"
      },
      { name: "affekt",
        symbol: "АФ",
        label: "Аффективная сфера"
      },
      { name: "rech",
        symbol: "РМ",
        label: "Речь и мышление"
      },
      { name: "kognit",
        symbol: "ИП",
        label: "Интеллект и память"
      },
      { name: "pp",
        symbol: "ПП",
        label: "Психопродукция"
      },
      { name: "diagnoz",
        symbol: "ДЗ",
        label: "Диагноз"
      },
      { name: "rekomendacii",
        symbol: "РК",
        label: "Рекомендации"
      },
      { name: "lechenie",
        symbol: "ЛЧ",
        label: "Лечение"
      }
    ];
    
    let tabMenuRender = tabsMenu.map((item)=>{
      let tabClass = classNames({
        'app__tab-menu-item': true,
        'is-active': item.name === this.state.activeTab
      });
      
      return <div 
        onClick={this.toggleTab} 
        title={item.label} 
        key={item.name} 
        data-id={item.name}
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
        <ZhalobyManager toggleSymptom={this.toggleSymptom} toggleText={this.toggleText}  toggleRadio={this.toggleRadio} psystatus={psystatus} />
      </div>,
      <div key="anamnez" name="anamnez">
        <AnamnezManager toggleSymptom={this.toggleSymptom} toggleText={this.toggleText}  toggleRadio={this.toggleRadio} psystatus={psystatus} />
      </div>,
      <div key="affekt" name="affekt">
        <AffektManager toggleSymptom={this.toggleSymptom} toggleText={this.toggleText}  toggleRadio={this.toggleRadio} psystatus={psystatus} />
      </div>,
      <div key="kognit" name="kognit">
        <KognitManager toggleSymptom={this.toggleSymptom} toggleText={this.toggleText}  toggleRadio={this.toggleRadio} psystatus={psystatus} />
      </div>
    ]

    let tabRender = tabs.filter((item)=>{
      return item.key === this.state.activeTab      
    })
  
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
              <AnamnezList psystatus={psystatus} toggleTab={this.toggleTab} />            
              <ZhalobyList psystatus={psystatus} toggleTab={this.toggleTab} /> 
              <AffektList psystatus={psystatus} toggleTab={this.toggleTab} /> 
              <KognitList psystatus={psystatus} toggleTab={this.toggleTab} /> 
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
    setText: bindActionCreators(setText, dispatch),
    setRadio: bindActionCreators(setRadio, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

