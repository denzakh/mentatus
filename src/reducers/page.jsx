import { components } from "../router";

export default (state = "home", action = {}) => {
	console.log(action);
	return components[action.type] || state;
};
