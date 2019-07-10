import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Registration from './containers/Registration';
import Login from './containers/Login';
import AppliedRoute from './components/AppliedRoute';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute exact path="/" component={Home} props={childProps} />
    <AppliedRoute exact path="/register" component={Registration} props={childProps} />
    <AppliedRoute exact path="/login" component={Login} props={childProps} />
    {/* Catch all for unmatched routes */}
    <Route />
  </Switch>
);
