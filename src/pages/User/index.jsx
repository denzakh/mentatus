import React, { Component } from "react";
import { connect } from "react-redux";
import "./User.css";

class User extends Component {
	render() {
		return (
			<div className="user">
				<h1>
					Настройки <span className="user__user-id">111</span>
				</h1>
				<div className="user__list">111</div>
				<div className="user__save-row">
					<button type="button" className="button">
						Сохранить
					</button>
					<div className="user__status">333</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

//bindActionCreators оборачивает каждый экшн в dispatch, поэтому когда мы вызываем this.props.actions.myFunc() происходит dispatch экшена myFunc, только он скрыт под капотом
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
