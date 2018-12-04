import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { getNewsById, updateNews, deleteNews } from "../actions/newsActions";

import NewsView from "../components/NewsView";
import EditedNews from "../components/EditedNews";

class NewsPageContainer extends Component {
  state = {
    edited: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getNewsById(id);
  }

  editHandler = () => {
    this.setState(state => ({ edited: !state.edited }));
  };

  updateHandler = (title, content) => {
    const { id } = this.props.match.params;
    this.props.updateNews(id, title, content, this.editHandler);
  };

  deleteHandler = () => {
    const { id } = this.props.match.params;
    this.props.deleteNews(id, this.redirect);
  };

  redirect = () => {
    this.props.history.push("/");
  };

  render() {
    const { edited } = this.state;
    const { currentNews, isFetching, isLoggedIn, user } = this.props;
    return (
      <div className="news-page">
        <NavLink to="/" className="navlink-back">
          {`< Назад`}
        </NavLink>
        {!edited ? (
          <NewsView
            news={currentNews}
            isFetching={isFetching}
            isAuth={isLoggedIn}
            user={user}
            editHandler={this.editHandler}
            deleteHandler={this.deleteHandler}
          />
        ) : (
          <EditedNews
            title={currentNews.title}
            content={currentNews.content}
            submitHandler={this.updateHandler}
            cancelHandler={this.editHandler}
          />
        )}
      </div>
    );
  }
}

NewsPageContainer.propTypes = {
  currentNews: PropTypes.shape(),
  user: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    currentNews: state.newsReducer.currentNews,
    user: state.authReducer.user,
    isFetching: state.newsReducer.isFetching,
    isLoggedIn: state.authReducer.isLoggedIn,
  }),
  { getNewsById, updateNews, deleteNews },
)(NewsPageContainer);
