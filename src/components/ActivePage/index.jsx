import React, { Component } from "react";
import { connect } from "react-redux";
import pages from "../../containers/pages";

class ActivePage extends Component {
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

function mapStateToProps(state) {
  return {
    activePageName: state.option.activePageName
  };
}

export default connect(mapStateToProps)(ActivePage);
