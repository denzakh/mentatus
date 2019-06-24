import React, { Component } from "react";
import "./Header.css";
import pages from "../../containers/pages";
import { setPage } from "../../actions/general";
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
          <li
            className="header__menu-item"
            key={item.name}
            name={item.name}
            data-id={item.name}
            onClick={this.togglePage}
          >
            {item.title}
          </li>
        );
      });
    };

    return (
      <header className="header">
        <ul className="header__menu">{getMenu(this.props.store)}</ul>
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
