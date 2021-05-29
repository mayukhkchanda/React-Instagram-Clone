import React, { useEffect, useState } from "react";
import "../css/global/Form.css";

import { Formik } from "formik";
import SpinnerSmall from "./SpinnerSmall";

function Form({
  emailPlaceholder,
  passwordPlaceholder,
  submitBtnText,
  showUsernameFeild,
  userNamePlaceholder,
  onFormSubmit,
  OAuthError,
}) {
  const [displaySpinner, setdisplaySpinner] = useState(false);

  useEffect(() => {
    if (OAuthError !== "") setdisplaySpinner(false);
  }, [OAuthError]);

  /**should Submit be disabled? */
  const isDisabled = (values = {}, errors = {}) => {
    //console.log(values);
    if (values?.email === "" || values?.password === "") {
      return true;
    }
    if (Object.keys(errors).length > 0) {
      return true;
    }
    return false;
  };

  /**Render Error Div message */
  const renderErr = (errorMsg, touched) => {
    if (errorMsg && touched)
      return (
        <div className="error-message">{errorMsg && touched && errorMsg}</div>
      );
    else return null;
  };

  /**Render OAuth Message */
  const renderOAuthMsg = (Message) => {
    return <div className="google-auth-message">{Message}</div>;
  };

  return (
    /**Formik Component */
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validate={(values) => {
        const errors = {};

        /**Check Email */
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        /**Check Password */
        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 6) {
          errors.password = "Password must contain atleast 6 characters";
        } else if (values.password.length > 50) {
          errors.password = "Password must contain atmost 50 characters";
        }

        /**Check Username */
        if (showUsernameFeild && !values?.username) {
          errors.username = "Username is required";
        } else if (showUsernameFeild && values?.username.length < 6) {
          errors.username = "Username must contain atleast 6 characters";
        } else if (showUsernameFeild && values?.username.length > 20) {
          errors.username = "User must contain atmost 20 characters";
        }

        return errors;
      }}
      /**On submit callback handler */
      onSubmit={(values, { setSubmitting }) => {
        onFormSubmit(values);
        setSubmitting(false);
        setdisplaySpinner(true);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {
        //console.log(errors);
        return (
          <form onSubmit={handleSubmit} className="form">
            {showUsernameFeild ? (
              <label className="form__input--container">
                {/* <span>Phone number, username, or email</span>  */}
                <input
                  name="username"
                  type="text"
                  className={`form__input ${
                    errors.username && touched.username && errors.username
                      ? "form__input--error"
                      : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={userNamePlaceholder}
                  value={values.username}
                />
                {renderErr(errors.username, touched.username)}
              </label>
            ) : null}
            <label className="form__input--container">
              {/* <span>Phone number, username, or email</span>  */}
              <input
                name="email"
                type="text"
                className={`form__input ${
                  errors.email && touched.email && errors.email
                    ? "form__input--error"
                    : ""
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={emailPlaceholder}
                value={values.email}
              />
            </label>
            {renderErr(errors.email, touched.email)}
            <label className="form__input--container">
              {/* <span>Password</span>  */}
              <input
                name="password"
                type="password"
                className={`form__input ${
                  errors.password && touched.password && errors.password
                    ? "form__input--error"
                    : ""
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={passwordPlaceholder}
                value={values.password}
              />
            </label>
            {renderErr(errors.password, touched.password)}

            {OAuthError !== "" ? renderOAuthMsg(OAuthError) : null}

            <input
              type="submit"
              value={submitBtnText}
              className={`form__login ${
                isDisabled(values, errors) ? "disabled" : ""
              }`}
              disabled={isSubmitting || isDisabled(values, errors)}
            />

            {displaySpinner ? <SpinnerSmall /> : null}
          </form>
        );
      }}
    </Formik>
  );
}

export default Form;
