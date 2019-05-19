import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Repository extends Component {
  render() {
    return <div className="repository">Repository</div>;
  }
}

function mapStateToProps(state) {
  return {
    psystatus: state.psystatus,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repository);
