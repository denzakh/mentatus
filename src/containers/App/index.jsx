import React from "react";
import { connect } from "react-redux";
import Login from "../../pages/Login/";
import * as components from "../test";
import Backendless from "../../BDConfig";

// нужно пропросить функцию входа в логин как пропс
const App = ({ page }) => {
	let token = Backendless.LocalCache.get("user-token");
	console.log(token);
	if (token) {
		const Component = components[page];
		return <Component />;
	} else {
		return <Login />;
	}
};

const mapStateToProps = ({ page }) => ({ page });

export default connect(mapStateToProps)(App);
