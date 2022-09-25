import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';

import Login from '../views/Login';
import Signup from '../views/Signup';
import Dashboard from '../views/Dashboard';

import history from './history';

const PrivateRoute = (props) => {
  const storage = JSON.parse(localStorage.getItem('@anime-control'));
  const isLogged = !!storage;

  return isLogged ? <Route {...props} /> : <Redirect to="/login" />;
};

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute path="/user/dashboard" component={Dashboard} />
      <Redirect from="*" to="/login" />
    </Switch>
  </Router>
);

export default Routes;
