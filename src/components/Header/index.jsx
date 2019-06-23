import React, { Component } from "react";
import "./Header.css";
import pages from "../../containers/pages";
import { setPage } from "../../actions/pageAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Header extends Component {
  togglePage = e => {
    const name = e.target.getAttribute("data-id");
    this.props.bindSetPage(name);
  };

  render() {
    let getMenu = store => {
      return pages.map(item => {
        return (
          <span
            key={item.name}
            name={item.name}
            data-id={item.name}
            onClick={this.togglePage}
          >
            {item.title}
          </span>
        );
      });
    };

    return (
      <header className="header">
        <div className="header__menu">{getMenu(this.props.store)}</div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    general: state.general
  };
}

function mapDispatchToProps(dispatch) {
  return {
    bindSetPage: bindActionCreators(setPage, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
