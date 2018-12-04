import React from "react";
import { NavLink } from "react-router-dom";
import htmlParser from "html-react-parser";
import PropTypes from "prop-types";
// import { connect } from "react-redux";

const NewsItem = ({ news }) => {
  const date = new Date(news.createDate);
  const option = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <div className="news-item">
      <div className="news-header">
        <span className="news-author">{news.creator.displayName}</span>
        <span className="news-date">{date.toLocaleString("ru", option)}</span>
      </div>
      <NavLink to={`/news/${news._id}`} className="news-title">
        {news.title}
      </NavLink>
      <div className="news-text">{htmlParser(news.preview)}</div>
    </div>
  );
};

NewsItem.propTypes = {
  news: PropTypes.shape().isRequired,
};

export default NewsItem;
