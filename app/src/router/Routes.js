import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';

import verifyToken from '../dist/Infraestructury/authentication/blank';

import Login from '../views/Login';
import Signup from '../views/Signup';
import Dashboard from '../views/Dashboard';

import history from './history';

async function checkToken() {
  const isLogged = await verifyToken();

  return isLogged;
}

const PrivateRoute = props => (checkToken() ? <Route {...props} /> : <Redirect to="/login" />);

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/user/dashboard" component={Dashboard} />
      <Redirect from="*" to="/login" />
    </Switch>
  </Router>
);

export default Routes;
