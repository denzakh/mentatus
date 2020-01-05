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
			console.dir(formData);
			userLoginSuccess(formData);
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

export const userLoginSuccess = formData => {
	console.dir(formData);
	return {
		type: "USER_LOGIN_SUCCESS",
		payload: formData
	};
};

export const userLoginError = error => {
	return {
		type: "USER_LOGIN_ERROR",
		payload: null,
		error: error
	};
};

// else {
// 	return {
// 		type: "USER_LOGIN_ERROR",
// 		payload: null,
// 		error: error
// 	};
// }
// export const setUserLogOut = () => {
// 	Backendless.UserService.logout()
// 		.then(function() {
// 			console.log("logout");
// 			return {
// 				type: "USER_LOGOUT"
// 			};
// 		})
// 		.catch(function(error) {
// 			console.dir(error);
// 		});
// };
