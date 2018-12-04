import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getAllNews } from "../actions/newsActions";

import NewsList from "../components/NewsList";

class HomeContainer extends Component {
  componentDidMount() {
    this.props.getAllNews();
  }

  render() {
    const { allNews, isFetching } = this.props;

    return (
      <div className="news-container">
        <NewsList news={allNews} isFetching={isFetching} />
      </div>
    );
  }
}

HomeContainer.propTypes = {
  allNews: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isFetching: PropTypes.bool.isRequired,
  getAllNews: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    allNews: state.newsReducer.allNews,
    isFetching: state.newsReducer.isFetching,
  }),
  { getAllNews },
)(HomeContainer);
