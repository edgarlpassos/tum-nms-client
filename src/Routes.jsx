import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './containers/Home';
import Login from './containers/Login';
import Registration from './containers/Registration';
import VideoUpload from './containers/VideoUpload';
import Profile from './containers/Profile';
import VideoItem from './containers/VideoItem';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute exact path="/" component={Home} props={childProps} />
    <AppliedRoute exact path="/register" component={Registration} props={childProps} />
    <AppliedRoute exact path="/login" component={Login} props={childProps} />
    <UnauthenticatedRoute exact path="/register" component={Registration} props={childProps} />
    <UnauthenticatedRoute exact path="/login" component={Login} props={childProps} />
    <ProtectedRoute exact path="/upload" component={VideoUpload} props={childProps} />
    <AppliedRoute exact path="/profile/:id" component={Profile} props={childProps} />
    <AppliedRoute exact path="/video/:id" component={VideoItem} props={childProps} />
    {/* Catch all for unmatched routes */}
    <Route />
  </Switch>
);
