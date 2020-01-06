import Backendless from "../../BDConfig";

export const setUserLogIn = (
	userLoginStart,
	userLoginSuccess,
	userLoginError,
	formData
) => {
	let { login, password, stayLoggedIn } = formData;
	userLoginStart();
	Backendless.UserService.login(login, password, stayLoggedIn)
		.then(function(loggedInUser) {
			userLoginSuccess(loggedInUser);
		})
		.catch(function(error) {
			userLoginError(error);
		});
};

export const userLoginStart = () => {
	return {
		type: "USER_LOGIN_START"
	};
};

export const userLoginSuccess = loggedInUser => {
	loggedInUser["user-token"] = null;
	return {
		type: "USER_LOGIN_SUCCESS",
		payload: loggedInUser
	};
};

export const userLoginError = error => {
	return {
		type: "USER_LOGIN_ERROR",
		payload: null,
		error: error
	};
};

export const setUserLogOut = () => {
	Backendless.UserService.logout()
		.then(function() {
			console.log("logout");
		})
		.catch(function(error) {
			console.dir(error);
		});
	return {
		type: "USER_LOGOUT"
	};
};
