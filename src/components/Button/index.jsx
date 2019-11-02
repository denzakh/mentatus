import React, { Component } from "react";
import "./style.css";

export default class Button extends Component {
	render() {
		return (
			<button
				type={this.props.type ? this.props.type : "button"}
				onClick={this.props.onClick}
				className="button"
				disabled={this.props.disabled}
			>
				{this.props.children}
			</button>
		);
	}
}
