import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { signIn } from "../actions/authActions";

const LoginBlock = props => {
  const signInHandler = event => {
    event.preventDefault();
    props.signIn();
  };

  return (
    <div className="login-block">
      <button className="btn btn-login" onClick={signInHandler}>
        Войти
      </button>
    </div>
  );
};

LoginBlock.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default connect(
  null,
  { signIn },
)(LoginBlock);
