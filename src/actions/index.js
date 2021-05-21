import { SIGN_IN, SIGN_OUT } from "./types";

export const signin = (user) => {
  return {
    type: SIGN_IN,
    payload: user,
  };
};

export const signout = () => {
  return {
    type: SIGN_OUT,
    payload: null,
  };
};
