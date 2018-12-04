import React from "react";
import PropTypes from "prop-types";

import NewsItem from "./NewsItem";
import withLoading from "../hoc/withLoading";

const NewsList = ({ news }) => {
  return (
    <div>
      {news.length === 0 ? (
        <p>Новостей еще нет.</p>
      ) : (
        news.map(item => <NewsItem key={item._id} news={item} />)
      )}
    </div>
  );
};

NewsList.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withLoading(NewsList);
