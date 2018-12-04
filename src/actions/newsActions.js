import axios from "axios";
import cookies from "react-cookies";
import truncate from "truncate-html";

import * as types from "../constants/newsTypes";

export const getAllNews = () => dispatch => {
  dispatch({ type: types.ALL_NEWS_REQUEST });
  axios
    .get("/api/v1/feeds")
    .then(({ data }) => {
      const news = data.feeds.map(item => {
        const preview = truncate(item.content, 30, { byWords: true });
        item.preview = preview;
        return item;
      });

      dispatch({ type: types.ALL_NEWS_SUCCESS, news });
    })
    .catch(err => {
      dispatch({ type: types.ALL_NEWS_FAILURE });
    });
};

export const getNewsById = id => dispatch => {
  dispatch({ type: types.CURRENT_NEWS_REQUEST });
  axios
    .get(`/api/v1/feeds/${id}`)
    .then(({ data }) => {
      dispatch({ type: types.CURRENT_NEWS_SUCCESS, current: data.feed });
    })
    .catch(err => {
      dispatch({ type: types.CURRENT_NEWS_FAILURE, err });
    });
};

export const createNews = (title, content, redirect) => dispatch => {
  dispatch({ type: types.CREATE_NEWS_REQUEST });
  const accessToken = cookies.load("ACCESS_TOKEN");
  const headers = {
    "x-access-token": accessToken,
  };
  axios
    .post("/api/v1/feeds", { title, content }, { headers })
    .then(({ data }) => {
      const createdNews = data.feed;
      createdNews.preview = truncate(createdNews.content, 30, {
        byWords: true,
      });
      dispatch({ type: types.CREATE_NEWS_SUCCESS, createdNews });
      redirect();
    })
    .catch(err => {
      dispatch({ type: types.CREATE_NEWS_FAILURE, err });
    });
};

export const updateNews = (id, title, content, redirect) => dispatch => {
  dispatch({ type: types.UPDATE_NEWS_REQUEST });
  const accessToken = cookies.load("ACCESS_TOKEN");
  const headers = {
    "x-access-token": accessToken,
  };
  axios
    .put(`/api/v1/feeds/${id}`, { title, content }, { headers })
    .then(({ data }) => {
      const updatedNews = data.feed;
      updatedNews.preview = truncate(updatedNews.content, 30, {
        byWords: true,
      });
      dispatch({ type: types.UPDATE_NEWS_SUCCESS, updatedNews });
      redirect();
    })
    .catch(err => {
      dispatch({ type: types.UPDATE_NEWS_FAILURE, err });
    });
};

export const deleteNews = (id, redirect) => dispatch => {
  dispatch({ type: types.DELETE_NEWS_REQUEST });
  const accessToken = cookies.load("ACCESS_TOKEN");
  const headers = {
    "x-access-token": accessToken,
  };
  axios
    .delete(`/api/v1/feeds/${id}`, { headers })
    .then(({ data }) => {
      redirect();
      dispatch({ type: types.DELETE_NEWS_SUCCESS, deletedNews: data.feed });
    })
    .catch(err => {
      dispatch({ type: types.DELETE_NEWS_FAILURE, err });
    });
};
