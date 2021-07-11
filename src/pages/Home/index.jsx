import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { updateOneTextOption, saveAllOption } from "../../actions/option";
import cicleFn from "../../fn/cicleFn";
import dataObj from "../../store/optionData";
import "./Home.css";

class Home extends Component {
	render() {
		return (
			<div className="page">
				<h1>Mentatus</h1>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		general: state.general
	};
}

//bindActionCreators оборачивает каждый экшн в dispatch, поэтому когда мы вызываем this.props.actions.myFunc() происходит dispatch экшена myFunc, только он скрыт под капотом
function mapDispatchToProps(dispatch) {
	return {
		// updateOneTextOption: bindActionCreators(updateOneTextOption, dispatch),
		// saveAllOption: bindActionCreators(saveAllOption, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
