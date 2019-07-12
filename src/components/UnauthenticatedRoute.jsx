import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: childProps, ...rest }) => (
  <Route
    {...rest}
    render={
      props => !childProps.isAuthenticated ? <C {...props} {...childProps} /> : <Redirect to="/" />
    }
  />
);
