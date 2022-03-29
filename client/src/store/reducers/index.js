import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { messengerReducer } from "./messenger";

export default combineReducers({
  authReducer,
  messengerReducer,
});
