import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import {setSymptom} from '../../actions/symptomAction.js';
import {setText} from '../../actions/textAction.js';

import ZhalobyManager from "../../components/ZhalobyManager";
import ZhalobyList from "../../components/ZhalobyList";
import AnamnezManager from "../../components/AnamnezManager";
import AnamnezList from "../../components/AnamnezList";


class App extends Component {

  toggleSymptom = (e) => {
    const name = e.target.name;
    this.props.setSymptom(name);
  }

  toggleText = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.setText(name, value);
  }

  render() {
    const psystatus = this.props.psystatus;

    return <div>
      <table width="100%">
        <tbody>
        <tr>
          <td className="options"  width="50%">
            <ZhalobyManager toggleSymptom={this.toggleSymptom} toggleText={this.toggleText} psystatus={psystatus} />  
            <AnamnezManager toggleSymptom={this.toggleSymptom} toggleText={this.toggleText} psystatus={psystatus} />              
          </td>
          <td className="status"  width="50%">
            <hr /> 
            <ZhalobyList psystatus={psystatus} /> 
            <AnamnezList psystatus={psystatus} /> 
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

