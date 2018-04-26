import { combineReducers } from "redux";
// import { moveOrderToCustomer } from "../actions/farmActions";
// import { createOrder, moveOrderToFarm } from "../actions/marketActions";
import first from "./first";
// import farm from "./farm";
// import market from "./market";

const combine = combineReducers({
  first
  // farm,
  // market
});

export default combine;
