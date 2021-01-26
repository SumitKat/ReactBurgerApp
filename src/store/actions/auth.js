// Authentication Action Creator.

import * as actionTypes from "./actionTypes";
import axios from "axios";

// Auth start action creator
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

// Auth success action creator
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

// Auth fail action creator
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

// Logout action creator, remove token, expiration date and user ID.
// Then call logout reducer.
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

// Dispatch logout action after expiration has passed.
export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

// Authentication action creator.
// email, password, isSignup payload.
export const auth = (email, password, isSignup) => {
  return dispatch => {
    // Dispatch authenticatioin start action.
    dispatch(authStart());

    // Authentication Data.
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    // Authentication URL.
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBX8L8lUIlQlYyThrlOLp36PzK-I4mugfc";

    // Signup URL.
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBX8L8lUIlQlYyThrlOLp36PzK-I4mugfc";
    }

    // Call signup or signin URL, update local storage and
    //  dispatch authentication success/ authtime out action creator.
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

// Set auth redirect path action creator.
export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

// Check authenticate action creator.
export const authCheckState = () => {
  return dispatch => {
    // Fetch Toke.
    const token = localStorage.getItem("token");

    // If token is not present dispatch logout action creator.
    if (!token) {
      dispatch(logout());
    } else {
      // Fetch expiration date.
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      // Check expiration date is less than current date.
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        // Fetch userID.
        const userId = localStorage.getItem("userId");

        // Dispatch auth Success action creator.
        dispatch(authSuccess(token, userId));

        // Dispatch auth check timeout.
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
