import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route {...rest}>
      {props => {
        return isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    </Route>
  );
};

export default ProtectedRoute;
