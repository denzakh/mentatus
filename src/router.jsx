import { NOT_FOUND } from "redux-first-router";

// for reducers/page
export const components = {
	HOME: "Home",
	USER: "User",
	[NOT_FOUND]: "NotFound"
};

// for configureStore
export const routesMap = {
	HOME: "/",
	USER: "/user/:id"
};
