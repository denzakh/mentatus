import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import List from "../../components/List";
import Checkbox from "../../components/Checkbox";
import Manager from "../../components/Manager";
import {setSymptom} from '../../actions/symptomAction.js'


class App extends Component {

  toggleChange = (e) => {
    console.log(e.target.dataset.id); 
    const index = e.target.dataset.id;
    this.props.setSymptom(index);
  }

  render() {
    return <div>
      <table width="100%">
        <tbody>
        <tr>
          <td className="options"  width="50%">
            <Manager onChange={this.toggleChange} psystatus={this.props.psystatus} />            
          </td>
          <td className="status"  width="50%">
            <List psystatus={this.props.psystatus} />
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

