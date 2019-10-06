import { NOT_FOUND } from "redux-first-router";

// for reducers/page
export const components = {
  HOME: "Home",
  SIGN_IN: "signIn",
  [NOT_FOUND]: "NotFound"
};

// for configureStore
export const routesMap = {
  HOME: "/",
  SIGN_IN: "/sign_in"
};
