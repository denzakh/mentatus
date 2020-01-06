import React, { Component } from "react";
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
		let formData = {
			login: this.state.login,
			password: this.state.password,
			stayLoggedIn: this.state.stayLoggedIn
		};
		this.props.handleSubmit(
			this.props.userLoginStart,
			this.props.userLoginSuccess,
			this.props.userLoginError,
			formData
		);
	};

	render() {
		let showIndicator = () => {
			if (this.props.user.isUpdate) {
				return <span className="login__update">...обновление</span>;
			}
			if (this.props.user.isError) {
				return <span className="login__errorr">произошла ошибка</span>;
			}
		};

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
						<div className="login__indicator">{showIndicator()}</div>
					</form>
				</div>
			</div>
		);
	}
}
