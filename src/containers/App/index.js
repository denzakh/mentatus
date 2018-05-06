import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import ZhalobyManager from "../../components/ZhalobyManager";
import ZhalobyList from "../../components/ZhalobyList";
import {setSymptom} from '../../actions/symptomAction.js';

class App extends Component {

  toggleSymptom = (e) => {
    console.log(e.target.name); 
    const name = e.target.name;
    this.props.setSymptom(name);
  }

  render() {
    const psystatus = this.props.psystatus;

    return <div>
      <table width="100%">
        <tbody>
        <tr>
          <td className="options"  width="50%">
            <ZhalobyManager toggleSymptom={this.toggleSymptom} psystatus={psystatus} />              
          </td>
          <td className="status"  width="50%">
            <hr /> 
            <ZhalobyList psystatus={psystatus} /> 
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
    setSymptom: bindActionCreators(setSymptom, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

