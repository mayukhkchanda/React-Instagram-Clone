import React, { useState } from "react";
import "./css/Signup.css";
import { ShortError } from "../utils/GetShortError";

import { Link } from "react-router-dom";
import history from "../history";

import Form from "../components/global/Form";
import { authenticator } from "../firebase";

import { connect } from "react-redux";
import { signin } from "../actions";

function Signup({ signin }) {
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
            //console.log(authUser);
            history.push("/");
          })
          .catch((error) => alert(error.message));
      })
      .catch((err) => {
        //console.log(err);
        setOAuthError(ShortError(err));
        //alert(ShortError(err));
      });
  };

  return (
    <div className="Signup">
      <div className="Signup__form">
        <Link to="/">
          <img
            src="https://th.bing.com/th/id/Rff854302b1aeaf008c572d7d015a0317?rik=KH%2b6kyi5Sbtz7g&riu=http%3a%2f%2fwww.edigitalagency.com.au%2fwp-content%2fuploads%2finstagram-logo-text-black-png.png"
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
})(Signup);
