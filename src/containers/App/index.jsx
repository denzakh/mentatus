import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from "../../pages/Login/";
import * as components from "../test";
import {
	setUserLogIn,
	userLoginStart,
	userLoginSuccess,
	userLoginError
} from "../../actions/login/";

// нужно пробросить функцию входа в логин как пропс
class App extends Component {
	render() {
		if (this.props.user) {
			let Component = components[this.props.page];
			return <Component />;
		} else {
			return (
				<Login
					handleSubmit={setUserLogIn}
					userLoginStart={this.props.userLoginStart}
					userLoginSuccess={this.props.userLoginSuccess}
					userLoginError={this.props.userLoginError}
				/>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		page: state.page,
		user: state.user
	};
}

/* В mapDispatchToProps
можно оорачивать функции-экшены в dispatch самостоятельно
или использовать bindActionCreators оборачивает каждый экшн в dispatch, поэтому когда мы вызываем this.props.actions.myFunc() происходит dispatch экшена myFunc, только он скрыт под капотом

*/

const mapDispatchToProps = (dispatch, ownProps) => ({
	userLoginStart: () => dispatch(userLoginStart()),
	userLoginSuccess: payload => dispatch(userLoginSuccess(payload)),
	userLoginError: error => dispatch(userLoginError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
