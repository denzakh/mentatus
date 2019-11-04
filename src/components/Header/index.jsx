import React, { Component } from "react";
import "./Header.css";
import pages from "../../containers/pages";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Preloader from "../Preloader";

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
				<div className="header__row">
					<div className="header__col-logo">
						<div className="header__logo-box">
							<img
								src="/static/img/logo.png"
								className="header__logo"
								alt="header-logo"
							/>
						</div>
						<div className="header__title">MentaStatus</div>
					</div>
					<div className="header__col-menu">
						<ul className="header__menu">{getMenu(this.props.store)}</ul>
					</div>
					<div className="header__col-preloader">
						<Preloader />
					</div>
				</div>
			</header>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
