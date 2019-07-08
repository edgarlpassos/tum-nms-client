import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Register from './containers/Register';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/register" component={Register} />
  </Switch>
);

