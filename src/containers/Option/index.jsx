import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

class Option extends Component {
  render() {
    return <div className="repository">Option</div>;
  }
}

function mapStateToProps(state) {
  return {
    psystatus: state.option
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Option);
