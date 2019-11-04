import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from "../../pages/Login/";
import * as components from "../test";
import { setUserLogIn, setUserLogOut } from "../../actions/login/";

// нужно пропросить функцию входа в логин как пропс
class App extends Component {
	render() {
		console.dir(this.props);
		if (this.props.user) {
			let Component = components[this.props.page];
			return <Component />;
		} else {
			return <Login submit={this.props.setUserLogIn} />;
		}
	}
}

function mapStateToProps(state) {
	console.log(state);
	return {
		page: state.page,
		user: state.user
	};
}

//bindActionCreators оборачивает каждый экшн в dispatch, поэтому когда мы вызываем this.props.actions.myFunc() происходит dispatch экшена myFunc, только он скрыт под капотом
function mapDispatchToProps(dispatch) {
	return {
		setUserLogIn: bindActionCreators(setUserLogIn, dispatch),
		setUserLogOut: bindActionCreators(setUserLogOut, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
