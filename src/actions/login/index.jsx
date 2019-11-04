import Backendless from "../../BDConfig";

export const setUserLogIn = (login, password, stayLoggedIn) => {
	return Backendless.UserService.login(login, password, stayLoggedIn)
		.then(function(loggedInUser) {
			console.log(loggedInUser);
			return {
				type: "USER_LOGIN",
				payload: loggedInUser
			};
		})
		.catch(function(error) {
			return {
				type: "USER_LOGIN_ERROR",
				payload: null,
				error: error
			};
		});
};

export const setUserLogOut = () => {
	Backendless.UserService.logout()
		.then(function() {
			console.log("logout");
			return {
				type: "USER_LOGOUT"
			};
		})
		.catch(function(error) {
			console.dir(error);
		});
};
