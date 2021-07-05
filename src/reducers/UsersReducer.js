import { FETCH_USERS, SIGN_OUT } from "../actions/types";
import _ from "lodash";

const INIT_STATE = {};

/**Reducer for suggested user */
const UsersReducer = (users = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return _.mapKeys(action.payload, "userId");

    case SIGN_OUT:
      return INIT_STATE;

    default:
      return users;
  }
};

export default UsersReducer;
