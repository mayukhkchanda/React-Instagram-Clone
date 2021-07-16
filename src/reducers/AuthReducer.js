// Reducer to handle Sign In/Out actions
import {
  SIGN_IN,
  SIGN_OUT,
  UPDATE_USER_INFO,
  CREATE_USER_DOC,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../actions/types";

// const INIT_STATE =  { email: null, username: "...", userId: "..." };

/**Reducer for signed-in user's state. Handles all updates to user state */
const AuthReducer = (user = null, action) => {
  switch (action.type) {
    case SIGN_IN:
    case UPDATE_USER_INFO:
    case CREATE_USER_DOC:
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return action.payload;

    case SIGN_OUT:
      return action.payload;

    default:
      return user;
  }
};

export default AuthReducer;
