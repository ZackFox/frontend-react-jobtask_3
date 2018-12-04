import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createNews } from "../actions/newsActions";

import EditedNews from "../components/EditedNews";

class CreateNewsContainer extends Component {
  createHandler = (title, content) => {
    this.props.createNews(title, content, this.redirect);
  };

  redirect = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="create-news">
        <NavLink to="/" className="navlink-back">
          {`< Назад`}
        </NavLink>
        <EditedNews
          submitHandler={this.createHandler}
          cancelHandler={this.redirect}
        />
      </div>
    );
  }
}

CreateNewsContainer.propTypes = {
  createNews: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createNews },
)(CreateNewsContainer);
