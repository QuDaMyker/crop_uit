import { logoutAction } from "./Actions/userActions";

export const ErrorsAction = (error, dispatch, action) => {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === "Not authorized, token failed") {
    // logout if token failed
    dispatch(logoutAction());
  }
  return dispatch({ type: action, payload: message });
};

// api token protection
export const tokenProtection = (getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  // if not have token return null
  if (!userInfo?.token) {
    return null;
  } else {
    // return user token
    return userInfo?.token;
  }
};
