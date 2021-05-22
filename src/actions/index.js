import { SIGN_IN, SIGN_OUT } from "./types";
import history from "../history";

export const signin = (user) => {
  history.push("/");

  return {
    type: SIGN_IN,
    payload: user,
  };
};

export const signout = () => {
  history.push("/");

  return {
    type: SIGN_OUT,
    payload: null,
  };
};
