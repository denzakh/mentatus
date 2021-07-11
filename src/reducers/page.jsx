import { components } from "../containers/Router/";

export default (state = null, action = {}) => {
  return components[action.type] || state;
};
