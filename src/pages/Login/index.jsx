import React, { Component } from "react";
import Backendless from "../../BDConfig";
import "./style.css";
import Button from "../../components/Button";

export default class Login extends Component {
	state = {
		login: "test2@mail.ru",
		password: "testPassword1",
		stayLoggedIn: false
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleChangeCheckbox = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		console.log("start login");
		Backendless.UserService.login(
			this.state.login,
			this.state.password,
			this.state.stayLoggedIn
		)
			.then(function(loggedInUser) {
				console.dir(loggedInUser);
			})
			.catch(function(error) {});
	};

	render() {
		return (
			<div className="login">
				<div className="login__box">
					<form onSubmit={this.handleSubmit}>
						<div className="login__title-row">
							<img
								src={`static/img/favicon-32x32.png`}
								alt="logo"
								width="32"
								height="32"
							/>
							<h1>Вход</h1>
						</div>
						<div className="login__row">
							<label className="login__label">Email</label>
							<input
								name="login"
								placeholder="Email"
								value={this.state.login}
								onChange={this.handleChange}
								className="login__input"
							/>
						</div>
						<div className="login__row">
							<label className="login__label">Пароль</label>
							<input
								type="password"
								name="password"
								placeholder="Пароль"
								value={this.state.password}
								onChange={this.handleChange}
								className="login__input"
							/>
						</div>
						<div className="login__row">
							<label className="login__label-checkbox">
								<input
									type="checkbox"
									name="stayLoggedIn"
									value={this.state.stayLoggedIn}
									onChange={this.handleChangeCheckbox}
									className="login__checkbox"
								/>
								запомнить вход
							</label>
						</div>
						<div className="login__row login__row--btn">
							<Button type="submit">Вход</Button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
