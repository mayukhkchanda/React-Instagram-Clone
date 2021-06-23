import { FETCH_USERS } from "../actions/types";
import _ from "lodash";

/**Reducer for suggested user */
const UsersReducer = (users = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return _.mapKeys(action.payload, "userId");

    default:
      return users;
  }
};

export default UsersReducer;
