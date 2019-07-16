import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Profile from './containers/Profile';
import Login from './containers/Login';
import Registration from './containers/Registration';
import AppliedRoute from './components/AppliedRoute';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute exact path="/" component={Home} props={childProps} />
    <AppliedRoute exact path="/profile/:id/:numVids?" component={Profile} props={childProps} />
    <AppliedRoute exact path="/register" component={Registration} props={childProps} />
    <AppliedRoute exact path="/login" component={Login} props={childProps} />
    {/* Catch all for unmatched routes */}
    <Route />
  </Switch>
);
