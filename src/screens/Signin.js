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
        //alert(ShortError(err));
      });
  };

  return (
    <div className="Signin">
      <div className="Signin__form">
        <Link to="/">
          <img
            alt="facebook-logo"
            src="https://th.bing.com/th/id/Rff854302b1aeaf008c572d7d015a0317?rik=KH%2b6kyi5Sbtz7g&riu=http%3a%2f%2fwww.edigitalagency.com.au%2fwp-content%2fuploads%2finstagram-logo-text-black-png.png"
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
            src="https://kpnet.dk/wp-content/uploads/2015/08/facebook-logo-small37.png"
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
