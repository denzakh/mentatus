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
    const departmentArray = e.target.dataset.department;
    this.props.setSymptom(index, departmentArray);
  }

  render() {
    return <div>
      <table width="100%">
        <tbody>
        <tr>
          <td className="options"  width="50%">
            <Manager onChange={this.toggleChange} department={this.props.psystatus.psystatus} />
            <Manager onChange={this.toggleChange} department={this.props.psystatus.jaloby.jalobyArray} />              
          </td>
          <td className="status"  width="50%">
            <List department={this.props.psystatus.psystatus} />
            <hr /> Жалобы на 
            <List department={this.props.psystatus.jaloby.jalobyArray} />
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

