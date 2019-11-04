import Backendless from "../../BDConfig";

export const setUserLogIn = user => {
	return Backendless.UserService.login(user)
		.then(function(loggedInUser) {
			console.log("login");
			return {
				type: "USER_LOGIN",
				payload: loggedInUser
			};
		})
		.catch(function(error) {});
};

export const setUserLogOut = () => {
	return Backendless.UserService.logout()
		.then(function() {
			console.log("logout");
			return {
				type: "USER_LOGOUT"
			};
		})
		.catch(function(error) {});
};
