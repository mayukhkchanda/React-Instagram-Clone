import AuthReducer from "./AuthReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: AuthReducer,
});

export default rootReducer;
