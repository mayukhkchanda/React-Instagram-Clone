import AuthReducer from "./AuthReducer";
import PostsReducer from "./PostsReducer";
import UsersReducer from "./UsersReducer";
import FollowersReducer from "./FollowersReducer";
import FollowingReducer from "./FollowingReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: AuthReducer, // user = { email: '...', username: '...', userId: '...', following: [...] }
  posts: PostsReducer,
  suggestedUsers: UsersReducer,
  followers: FollowersReducer,
  following: FollowingReducer,
});

export default rootReducer;
