import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { signOut } from "../actions/authActions";

const UserBlock = props => {
  const signOutHandler = event => {
    event.preventDefault();
    props.signOut();
  };

  return (
    <div className="user-block">
      <span className="profile-name">{props.user.name}</span>
      <button className="btn btn-logout" onClick={signOutHandler}>
        Выйти
      </button>
    </div>
  );
};

UserBlock.proptypes = {
  user: PropTypes.shape().isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: state.authReducer.user,
  }),
  { signOut },
)(UserBlock);
