import { NOT_FOUND } from "redux-first-router";

// for reducers/page
export const components = {
	HOME: "Home",
	USER: "User",
	STATUS: "CurrentStatus",
	REPOSITORY: "Repository",
	[NOT_FOUND]: "NotFound"
};

// for configureStore
export const routesMap = {
	HOME: "/",
	USER: "/user",
	STATUS: "/status",
	REPOSITORY: "/repository"
};
