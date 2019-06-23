import React, { Component } from "react";
import pages from "../../containers/pages";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Рендерит открытую страницу
class ActivePage extends Component {
  render() {
    console.log(this.props.general);
    let getActivePage = general => {
      let page = pages.filter(item => {
        return item.name === general.activePageName;
      });
      return page[0].component;
    };

    return (
      <div className="wrapper__active-page">
        {getActivePage(this.props.general)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    general: state.general
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivePage);
