let userInitialState = { email: null, isUpdate: false, isError: false };

export default function user(state = userInitialState, action) {
	let newUserState;

	switch (action.type) {
		case "USER_LOGIN_START":
			newUserState = { ...state };
			newUserState.isUpdate = true;
			newUserState.isError = false;
			return state;

		case "USER_LOGIN_SUCCESS":
			newUserState = { ...state, ...action.payload };
			newUserState.isUpdate = false;
			newUserState.isError = false;
			return newUserState;

		case "USER_LOGIN_ERROR":
			newUserState = { ...state };
			newUserState.isUpdate = false;
			newUserState.isError = true;
			console.error(action.error);
			return newUserState;

		case "USER_LOGOUT":
			return userInitialState;

		default:
			return state;
	}
}
