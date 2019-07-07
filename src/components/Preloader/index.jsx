import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";

class Preloader extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <div className="preloader">
          <div id="floatingCirclesG">
            <div className="f_circleG" id="frotateG_01"></div>
            <div className="f_circleG" id="frotateG_02"></div>
            <div className="f_circleG" id="frotateG_03"></div>
            <div className="f_circleG" id="frotateG_04"></div>
            <div className="f_circleG" id="frotateG_05"></div>
            <div className="f_circleG" id="frotateG_06"></div>
            <div className="f_circleG" id="frotateG_07"></div>
            <div className="f_circleG" id="frotateG_08"></div>
          </div>
        </div>
      );
    } else {
      return <div className="preloader"></div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.general.dataIsLoadingOrSaving
  };
}

function mapDispatchToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preloader);
