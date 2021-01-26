// Authentication reducer.

import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

// Initial state
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

// Auth start method sets error state to null and loading to true.
const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

// Authentication success method, sets token, user ID, error and loading state.
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  });
};

// Authetication failure methods, sets error and loading state.
const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

// Logout methods sets token, userID state.
const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null
  });
};

// Redirect method sets authRedirectPath.
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path
  });
};

// Reducer method, receives state, action as payload
// Checks action type and call methods.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
