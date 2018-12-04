import React from "react";
import htmlParser from "html-react-parser";
import PropTypes from "prop-types";

import withLoading from "../hoc/withLoading";

const NewsView = ({ news, user, editHandler, deleteHandler }) => {
  const date = news && new Date(news.createDate);
  const option = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <article className="current-news">
      <div className="news-header">
        <span className="news-author">{news && news.creator.displayName}</span>
        <span className="news-date">
          {news && date.toLocaleString("ru", option)}
        </span>
      </div>

      <h2>{news && news.title}</h2>
      <div>{news && htmlParser(news.content)}</div>

      {news && user && news.creator._id === user.id && (
        <div className="news-footer">
          <button className="btn btn-edit" onClick={editHandler}>
            Редактировать
          </button>
          <button className="btn btn-delete" onClick={deleteHandler}>
            Удалить
          </button>
        </div>
      )}
    </article>
  );
};

NewsView.prototypes = {
  news: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  user: PropTypes.shape().isRequired,
  editHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default withLoading(NewsView);
