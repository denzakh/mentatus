import update from "immutability-helper";
let userInitialState = null;

export default function user(state = userInitialState, action) {
	switch (action.type) {
		case "USER_LOGIN_START":
			console.log("login action start");
			return state;

		case "USER_LOGIN_SUCCESS":
			console.log("user login success");
			console.log(action.payload);
			let newUserState = action.payload;
			return newUserState;

		case "USER_LOGIN_ERROR":
			console.log("login error");
			console.error(action.error);
			return state;

		case "USER_LOGOUT":
			return null;

		default:
			return state;
	}
}
