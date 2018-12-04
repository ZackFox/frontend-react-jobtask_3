import axios from "axios";
import cookies from "react-cookies";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../constants/authTypes";

import getDecodedUser from "../helpers/getDecodedUser";

export const initAPI = () => dispatch => {
  window.gapi.load("auth2", function() {
    window.gapi.auth2
      .init({ client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID })
      .then(auth2 => console.log("Google API init"))
      .catch(err => console.log("Google API ERROR", err));
  });
};

export const signIn = () => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  const auth2 = window.gapi.auth2.getAuthInstance();

  auth2
    .signIn()
    .then(googleUser => {
      const authToken = googleUser.getAuthResponse().id_token;
      cookies.save("AUTH_TOKEN", authToken);
      return axios.post("/api/v1/auth/google", { token: authToken });
    })
    .then(({ data }) => {
      const authToken = cookies.load("AUTH_TOKEN");
      const accessToken = data.token;
      cookies.save("ACCESS_TOKEN", accessToken);

      const user = getDecodedUser(authToken, accessToken);
      dispatch({ type: LOGIN_SUCCESS, user });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE });
    });
};

export const signOut = () => dispatch => {
  const auth2 = window.gapi.auth2.getAuthInstance();

  auth2.signOut().then(() => {
    cookies.remove("ID_TOKEN");
    cookies.remove("ACCESS_TOKEN");
    dispatch({ type: LOGOUT });
    console.log("User signed out");
  });
};
