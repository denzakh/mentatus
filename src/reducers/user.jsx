import update from "immutability-helper";
let userInitialState = null;

export default function user(state = userInitialState, action) {
	switch (action.type) {
		case "USER_LOGIN":
			console.log("login action");
			return update(action.payload);

		case "USER_LOGOUT":
			return null;

		default:
			return state;
	}
}
