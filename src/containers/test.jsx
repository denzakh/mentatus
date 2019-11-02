// test components.js
import React from "react";
import { connect } from "react-redux";
import Link from "redux-first-router-link";
import Backendless from "../BDConfig";

let login = "test2@mail.ru";
let password = "testPassword1";
let stayLoggedIn = true;

let user = {
	email: login,
	password: password,
	name1: "111",
	name2: "222"
};

function createUser() {
	console.log("start create user");
	Backendless.UserService.register(user)
		.then(function(registeredUser) {
			console.dir(registeredUser);
		})
		.catch(function(error) {});
}

function loginApp() {
	console.log("start login");
	Backendless.UserService.login(login, password, stayLoggedIn)
		.then(function(loggedInUser) {
			console.dir(loggedInUser);
		})
		.catch(function(error) {});
}

function logoutApp() {
	console.log("logout start");
	Backendless.UserService.logout()
		.then(function() {
			console.log("logout finish");
		})
		.catch(function(error) {
			console.log("error message - " + error.message);
			console.log("error code - " + error.statusCode);
		});
}

function getCurrentUser() {
	Backendless.UserService.getCurrentUser()
		.then(function(currentUser) {
			console.dir(currentUser);
		})
		.catch(function(error) {});
}

const Home = () => (
	<div>
		{getCurrentUser()}
		<h3>Home</h3>
		<p>
			<button type="button" onClick={createUser}>
				Регистрация
			</button>
		</p>
		<p>
			<button type="button" onClick={loginApp}>
				Вход
			</button>
		</p>
		<p>
			<button type="button" onClick={logoutApp}>
				Выход
			</button>
		</p>
	</div>
);

const User = ({ userId }) => <h3>{`User ${userId}`}</h3>;
const mapStateToProps = ({ location }) => ({
	userId: location.payload.id
});
const ConnectedUser = connect(mapStateToProps)(User);

const NotFound = () => {
	return (
		<div>
			<h3>404</h3>

			<Link to="/user/1">user 1</Link>
		</div>
	);
};

export { Home, ConnectedUser as User, NotFound };
