import React, { Component } from "react";
import "./Back.css";

import Backendless from "backendless";

const APP_ID = "0E5B183F-2CAF-AE3F-FF18-A91BB0BF0200";
const API_KEY = "E6A07455-F8EA-CB77-FFC6-3A3E2CEF4C00";
Backendless.serverURL = "https://api.backendless.com";
Backendless.initApp(APP_ID, API_KEY);

const initialState = {
  loading: true,
  message: "",
  error: null
};

class Back extends Component {
  state = initialState;

  componentDidMount() {
    Backendless.Data.of("TestTable")
      .save({ foo: "bar" })
      .then(obj => {
        const message =
          "A data object has been saved in Backendless. Check 'TestTable' in Backendless Console." +
          `ObjectId = ${obj.objectId}`;

        this.setState({ message, loading: false });
      })
      .catch(error =>
        this.setState({ error: `Got an error - ${error}`, loading: false })
      );
  }

  render() {
    const { error, loading, message } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Backendless with React</h2>
          <h2>{loading ? "Loading..." : message || error} </h2>
        </div>
        <p className="App-intro">{loading ? "Loading..." : message || error}</p>
      </div>
    );
  }
}

export default Back;
