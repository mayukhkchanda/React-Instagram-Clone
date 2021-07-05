import React, { useEffect } from "react";
import "./App.css";
import Homepage from "./screens/Homepage";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import SignedInHomepage from "./screens/SignedInHomepage";
import PostShow from "./screens/PostShow";
import PostEdit from "./screens/PostEdit";
import PostDelete from "./screens/PostDelete";
import PostComment from "./screens/PostComment";

import { authenticator } from "./firebase";

import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import { signin, signout } from "./actions";
import { connect } from "react-redux";
import UserProfile from "./screens/UserProfile";
import UserFollowers from "./screens/UserFollowers";
import UserFollowing from "./screens/UserFollowing";
import NewFollowers from "./screens/NewFollowers";

const App = ({ User, signin, signout }) => {
  useEffect(() => {
    const unsubscribe = authenticator.onAuthStateChanged(function (user) {
      if (user) {
        //User is logged in
        signin({
          email: user.email,
          username: user.displayName,
          userId: user.uid,
        });
      } else {
        //User is signed out
        signout();

        history.push("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          <Route
            path="/"
            exact
            component={User ? SignedInHomepage : Homepage}
          />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route
            path="/show/:preview/:id/"
            exact
            component={User ? PostShow : Signin}
          />
          <Route path="/edit/:id" exact component={User ? PostEdit : Signin} />
          <Route
            path="/delete/:id"
            exact
            component={User ? PostDelete : Signin}
          />
          <Route
            path="/comments/:id"
            exact
            component={User ? PostComment : Signin}
          />
          <Route
            path="/user/suggestion"
            exact
            component={User ? NewFollowers : Signin}
          />
          <Route
            path="/user/profile"
            exact
            component={User ? UserProfile : Signin}
          />
          <Route
            path="/:userId/followers"
            exact
            component={User ? UserFollowers : Signin}
          />
          <Route
            path="/:userId/following"
            exact
            component={User ? UserFollowing : Signin}
          />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return { User: state.user };
};

export default connect(mapStateToProps, {
  signin,
  signout,
})(App);
