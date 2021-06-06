/**Returns a short and application specific error message */
export const ShortError = (Err) => {
  switch (Err.code) {
    case "auth/user-not-found":
      return "Unregistered Email. Please Sign up to an Account.";
    case "auth/wrong-password":
      return "Password is invalid or your account is deactivated.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later";
    case "auth/email-already-in-use":
      return "Email already in use. Please try to Login or use different email to Signup.";
    default:
      return "";
  }
};
