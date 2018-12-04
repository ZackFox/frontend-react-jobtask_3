import React from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import LoginBlock from "./LoginBlock";
import UserBlock from "./UserBlock";

const Header = props => {
  const { user, isLoggedIn, location } = props;
  return (
    <header className="header">
      <div className="container">
        <div className="header-flex">
          <div className="logo">
            <NavLink to="/">TZ#3</NavLink>
          </div>

          {isLoggedIn && !location.pathname.includes("create") && (
            <div className="header-item">
              <NavLink className="btn btn-create" to="/news/create">
                Написать новость
              </NavLink>
            </div>
          )}

          <div className="header-user">
            {isLoggedIn && user ? <UserBlock /> : <LoginBlock />}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.prototypes = {
  user: PropTypes.shape().isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withRouter(
  connect(
    state => ({
      user: state.authReducer.user,
      isLoggedIn: state.authReducer.isLoggedIn,
    }),
    null,
  )(Header),
);
