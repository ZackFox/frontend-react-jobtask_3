import * as types from "../constants/newsTypes";

const initialState = {
  allNews: [],
  currentNews: null,
  isFetching: false,
  sending: false,
  errors: "",
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    //----------- create news
    case types.CREATE_NEWS_REQUEST:
      return { ...state, sending: true };
    case types.CREATE_NEWS_SUCCESS:
      return {
        ...state,
        allNews: [...state.allNews, action.createdNews],
        sending: false,
      };
    case types.CREATE_NEWS_FAILURE:
      return { ...state, sending: false };

    //---------- get all news
    case types.ALL_NEWS_REQUEST:
      return { ...state, isFetching: true };
    case types.ALL_NEWS_SUCCESS:
      return { ...state, allNews: action.news, isFetching: false };
    case types.ALL_NEWS_FAILURE:
      return { ...state, isFetching: false };

    //----------- get current news
    case types.CURRENT_NEWS_REQUEST:
      return { ...state, isFetching: true };
    case types.CURRENT_NEWS_SUCCESS:
      return {
        ...state,
        currentNews: action.current,
        isFetching: false,
      };
    case types.CURRENT_NEWS_FAILURE:
      return { ...state, isFetching: false };

    //----------- update news
    case types.UPDATE_NEWS_REQUEST:
      return { ...state, sending: true };
    case types.UPDATE_NEWS_SUCCESS: {
      const coppyArray = [...state.allNews].filter(
        item => item._id !== action.updatedNews._id,
      );
      coppyArray.push(action.updatedNews);
      return {
        ...state,
        allNews: coppyArray,
        currentNews: action.updatedNews,
        sending: false,
      };
    }
    case types.UPDATE_NEWS_FAILURE:
      return { ...state, sending: false };

    //----------- delete news
    case types.DELETE_NEWS_REQUEST:
      return { ...state, sending: true };
    case types.DELETE_NEWS_SUCCESS: {
      const coppyArray = [...state.allNews].filter(
        item => item._id !== action.deletedNews._id,
      );
      return {
        ...state,
        allNews: coppyArray,
        currentNews: null,
        sending: false,
      };
    }
    case types.DELETE_NEWS_FAILURE:
      return { ...state, sending: false };
    default:
      return state;
  }
};

export default newsReducer;
