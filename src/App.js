import React, { useEffect } from "react";
import "./App.css";
import Homepage from "./screens/Homepage";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import SignedInHomepage from "./screens/SignedInHomepage";
import { authenticator } from "./firebase";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { signin, signout } from "./actions";
import { connect } from "react-redux";

//const user = { email: "test", username: "test" };

const App = ({ User, signin, signout }) => {
  useEffect(() => {
    const unsubscribe = authenticator.onAuthStateChanged(function (user) {
      if (user) {
        //User is logged in
        console.log(user);
        signin({
          email: user.email,
          username: user.displayName,
          userId: user.uid,
        });
      } else {
        //User is signed out
        signout();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route
            path="/"
            exact
            component={User ? SignedInHomepage : Homepage}
          />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return { User: state.user };
};

export default connect(mapStateToProps, {
  signin,
  signout,
})(App);
