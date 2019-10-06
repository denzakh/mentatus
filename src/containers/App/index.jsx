import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import CurrentStatus from "../CurrentStatus";
import Login from "../Login";
import Option from "../Option";
import Repository from "../Repository";

class App extends Component {
  render() {
    return <div>{this.renderPage()}</div>;
  }

  renderPage() {
    console.dir(this.props);
    switch (this.props.page) {
      case "Home":
        return <Option {...this.props} />;
      case "signIn":
        return <Login {...this.props} />;
      default:
        return <div>whoops</div>;
    }
  }
}

const mapState = ({ page, direction, ...state }) => ({
  page
});

export default connect(mapState)(App);
