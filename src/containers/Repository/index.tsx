import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import type { StatusState } from "../../types/status";

// среза `repository` в сторе пока нет — заглушка для будущего раздела
type StateWithRepository = StatusState & { repository?: unknown };

interface StateProps {
  psystatus?: unknown;
}

class Repository extends Component<StateProps> {
  render() {
    return <div className="repository">Repository</div>;
  }
}

function mapStateToProps(state: StateWithRepository): StateProps {
  return {
    psystatus: state.repository
  };
}

export default connect<StateProps>(mapStateToProps)(Repository);
