import React from "react";
import "../css/global/Form.css";

import { Formik } from "formik";

function Form({
  emailPlaceholder,
  passwordPlaceholder,
  submitBtnText,
  showUsernameFeild,
  userNamePlaceholder,
  onFormSubmit,
}) {
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

  return (
    /**Formik Component */
    <Formik
      initialValues={{ email: "", password: "" }}
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
                  className="form__input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={userNamePlaceholder}
                  value={values.username}
                />
                {errors.username && touched.username && errors.username}
              </label>
            ) : null}

            <label className="form__input--container">
              {/* <span>Phone number, username, or email</span>  */}
              <input
                name="email"
                type="text"
                className="form__input"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={emailPlaceholder}
                value={values.email}
              />
            </label>
            {errors.email && touched.email && errors.email}
            <label className="form__input--container">
              {/* <span>Password</span>  */}
              <input
                name="password"
                type="password"
                className="form__input"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={passwordPlaceholder}
                value={values.password}
              />
            </label>
            {errors.password && touched.password && errors.password}

            <input
              type="submit"
              value={submitBtnText}
              className={`form__login ${
                isDisabled(values, errors) ? "disabled" : ""
              }`}
              disabled={isSubmitting || isDisabled(values, errors)}
            />
          </form>
        );
      }}
    </Formik>
  );
}

export default Form;
