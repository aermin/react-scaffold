import React from "react";

import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import Bundle from "./Bundle";
import './style.scss';
import Robot from "bundle-loader?lazy&name=Robot!../pages/Robot";

const Loading = function() {
  return <div>Loading...</div>;
};

const createComponent = component => props => (
  <Bundle load={component}>
    {Component => (Component ? <Component {...props} /> : <Loading />)}
  </Bundle>
);

const getRouter = () => (
  <Router>
      <div>
              <Route  path="/" exact= {true} component={createComponent(Robot)} />
      </div>
  </Router>
);

export default getRouter;
