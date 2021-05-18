import React from "react";
import "./App.css";
import Homepage from "./screens/Homepage";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
