import React, { useState } from "react";
import "./css/Signin.css";
import { ShortError } from "../utils/GetShortError";

import { Link } from "react-router-dom";
import history from "../history";

import Form from "../components/global/Form";
import { authenticator } from "../firebase";

function Signin() {
  const [OAuthError, setOAuthError] = useState("");

  const onFormSubmit = ({ email, password }) => {
    authenticator
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) history.push("/");
      })
      .catch((err) => {
        setOAuthError(ShortError(err));
      });
  };

  return (
    <div className="Signin">
      <div className="Signin__form">
        <Link to="/">
          <img
            alt="instagram logo"
            src={`${process.env.PUBLIC_URL}/assets/images/instagram-logo.png`}
            className="form__logo"
          />
        </Link>

        <Form
          emailPlaceholder="Email"
          passwordPlaceholder="Password"
          submitBtnText="Log In"
          onFormSubmit={onFormSubmit}
          OAuthError={OAuthError}
        />

        <div className="form__orText">
          <span className="orText__bar"></span>
          <span className="grey-text">OR</span>
          <span className="orText__bar"></span>
        </div>

        <a href="#" className="form__Fblogin no-background">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/facebook-logo-small.png`}
            className="fb-logo"
          ></img>
          <span className="grey-text fb-blue font-bigger">
            Log in with Facebook
          </span>
        </a>

        <a href="#" className="form__forgotPassword">
          Forgot Password?
        </a>
      </div>
      <div className="Signin__form signup">
        Don't have an account?&nbsp;
        <Link to="/signup" href="#">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Signin;
