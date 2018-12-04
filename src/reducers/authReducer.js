import cookies from "react-cookies";

import getDecodedUser from "../helpers/getDecodedUser";
import isExpiredToken from "../helpers/isExpiredToken";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../constants/authTypes";

const authToken = cookies.load("AUTH_TOKEN");
const accessToken = cookies.load("ACCESS_TOKEN");

const initialState = {
  user: null,
  isLoggedIn: false,
  isFetching: false,
};

// Если токен есть и еще действует
if (authToken && accessToken && !isExpiredToken(authToken)) {
  // взять юзера из токена и записать в стейт
  // выставить флаг авторизации true
  initialState.user = getDecodedUser(authToken, accessToken);
  initialState.isLoggedIn = true;
} else {
  // иначе удалить токен
  cookies.remove("AUTH_TOKEN");
  cookies.remove("ACCESS_TOKEN");
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isFetching: false,
        isLoggedIn: true,
      };
    case LOGOUT:
      return { ...state, user: null, isLoggedIn: false };
    case LOGIN_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default authReducer;
