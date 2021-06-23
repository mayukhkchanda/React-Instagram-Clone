import React, { useState } from "react";
import "./css/Signup.css";
import { ShortError } from "../utils/GetShortError";

import { Link } from "react-router-dom";
import history from "../history";

import Form from "../components/global/Form";
import { authenticator } from "../firebase";

import { connect } from "react-redux";
import { signin, createUserDoc } from "../actions";

function Signup({ signin, createUserDoc }) {
  const [OAuthError, setOAuthError] = useState("");

  const onFormSubmit = ({ username, email, password }) => {
    authenticator
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user
          .updateProfile({
            displayName: username,
          })
          .then(() => {
            //after update redux state should also be updated

            //call signin action creator to update the state after updating the displayName
            //else displayName will remain null
            signin({
              email: authUser.user.email,
              username: authUser.user.displayName,
              userId: authUser.user.uid,
            });

            //create a document for this user in the 'users' collection
            createUserDoc({
              email: authUser.user.email,
              username: authUser.user.displayName,
              userId: authUser.user.uid,
              following: [authUser.user.uid],
            });

            history.push("/");
          })
          .catch((error) => alert(error.message));
      })
      .catch((err) => {
        setOAuthError(ShortError(err));
      });
  };

  return (
    <div className="Signup">
      <div className="Signup__form">
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/instagram-logo.png`}
            className="form__logo"
          />
        </Link>

        <p className="grey-text para-text">
          Sign up to see photos and videos from your friends.
        </p>

        <a href="#" className="form__Fblogin blue-background">
          <i className="fa fa-facebook-square"></i>
          <span className="grey-text fb-blue font-bigger">
            Log in with Facebook
          </span>
        </a>

        <div className="form__orText">
          <span className="orText__bar"></span>
          <span className="grey-text">OR</span>
          <span className="orText__bar"></span>
        </div>

        <Form
          showUsernameFeild
          userNamePlaceholder="Username"
          emailPlaceholder="Email"
          passwordPlaceholder="Password"
          submitBtnText="Sign up"
          onFormSubmit={onFormSubmit}
          OAuthError={OAuthError}
        />
      </div>
      <div className="Signup__form signin">
        Have an account?&nbsp;
        <Link to="/signin" href="#">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default connect(null, {
  signin,
  createUserDoc,
})(Signup);
