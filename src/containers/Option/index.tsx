import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import type { OptionState, StatusState } from "../../types/status";

interface StateProps {
  psystatus: OptionState;
}

class Option extends Component<StateProps> {
  render() {
    return <div className="repository">Option</div>;
  }
}

function mapStateToProps(state: StatusState): StateProps {
  return {
    psystatus: state.option
  };
}

export default connect<StateProps>(mapStateToProps)(Option);
