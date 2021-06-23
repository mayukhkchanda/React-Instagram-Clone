import AuthReducer from "./AuthReducer";
import PostsReducer from "./PostsReducer";
import UsersReducer from "./UsersReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: AuthReducer, // user = { email: '...', username: '...', userId: '...', following: [...] }
  posts: PostsReducer,
  suggestedUsers: UsersReducer,
});

export default rootReducer;
