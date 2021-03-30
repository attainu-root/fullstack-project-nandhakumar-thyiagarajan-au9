import React from "react";
import ReactDom from "react-dom";
import Router from "./Router/Routes";
import "./index.css";

import RootReducer from "./Reducers/Rootreducer";

import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";

const Store = createStore(RootReducer, applyMiddleware(thunk));

const Index = () => {
  return (
    <React.Fragment>
      <Provider store={Store}>
        <Router />
      </Provider>
    </React.Fragment>
  );
};

ReactDom.render(<Index />, document.getElementById("root"));
