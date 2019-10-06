import { components } from "../router";

export default (state = "HOME", action = {}) => {
  return components[action.type] || state;
};
