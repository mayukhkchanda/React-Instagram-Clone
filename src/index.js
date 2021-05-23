import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import rootReducer from "./reducers";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
  <Provider
    store={createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
