import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import rootReducer from "./reducers";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
  <Provider store={createStore(rootReducer, composeEnhancer())}>
    <App />
  </Provider>,
  document.getElementById("root")
);
