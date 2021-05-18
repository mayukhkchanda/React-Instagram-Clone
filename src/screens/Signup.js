import React, { useState } from "react";
import "./css/Signup.css";

import { Link } from "react-router-dom";
import Form from "../components/global/Form";

function Signup() {
  return (
    <div className="Signup">
      <div className="Signup__form">
        <img
          src="https://th.bing.com/th/id/Rff854302b1aeaf008c572d7d015a0317?rik=KH%2b6kyi5Sbtz7g&riu=http%3a%2f%2fwww.edigitalagency.com.au%2fwp-content%2fuploads%2finstagram-logo-text-black-png.png"
          className="form__logo"
        />

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
          emailPlaceholder="Email"
          passwordPlaceholder="Password"
          submitBtnText="Sign up"
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

export default Signup;
