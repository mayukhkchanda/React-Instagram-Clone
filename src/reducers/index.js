import AuthReducer from "./AuthReducer";
import PostsReducer from "./PostsReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: AuthReducer, // user = { email: '...', username: '...', userId: '...' }
  posts: PostsReducer,
});

export default rootReducer;
