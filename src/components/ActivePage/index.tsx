import React, { Component } from "react";
import { connect } from "react-redux";
import pages from "../../containers/pages";
import type { StatusState } from "../../types/status";

interface StateProps {
  activePageName: string;
}

class ActivePage extends Component<StateProps> {
  render() {
    const activePage = pages.filter(
      item => item.name === this.props.activePageName
    )[0];

    if (!activePage) {
      return null;
    }

    const ActiveComponent = activePage.component;

    return (
      <div className="wrapper__active-page">
        <ActiveComponent />
      </div>
    );
  }
}

function mapStateToProps(state: StatusState): StateProps {
  return {
    activePageName: state.option.activePageName
  };
}

export default connect(mapStateToProps)(ActivePage);
