import axios from "axios";
import {
  clearAuthData,
  clearAuthResponseMsg,
  setAuthLoader,
  setAuthResponseError,
  setCurrentUser,
  setUserProfile,
} from "../actions/authActions";
import { saveToken, clearToken } from "../global/authTokenHelpers";
import jwt_decode from "jwt-decode";
// import { clearProfileData } from '../actions/profileActions';
// import { getBaseUrl } from '../global/Environment';
import { isEmail, getAPIResponseError } from "../global/Helpers";
// const baseUrl = getBaseUrl();

export const login = (obj) => async (dispatch) => {
  try {
    dispatch(clearAuthResponseMsg());
    if (!obj) {
      dispatchAuthError("email", "Email is Required", dispatch);
      return;
    } else if (isEmail(obj.email) === false) {
      dispatchAuthError("username", "Invalid email", dispatch);
      return;
    } else if (!obj.password) {
      dispatchAuthError("password", "Password is Required", dispatch);
      return;
    }
    dispatch(setAuthLoader(true));
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
      obj
    );
    const { data, token } = response.data;
    console.log(data, "login");
    dispatch(setLoginToken(data, token));
    return true;
  } catch (e) {
    dispatchAuthError(
      "error",
      getAPIResponseError(e) || "Enter valid credentials please!!",
      dispatch
    );
    return false;
  } finally {
    dispatch(setAuthLoader(false));
  }
};

export const signup = (obj) => async (dispatch) => {
  try {
    dispatch(clearAuthResponseMsg());
    console.log(obj, " obj");
    if (!obj) {
      dispatchAuthError("email", "Email is Required", dispatch);
      return;
    } else if (!obj.email) {
      dispatchAuthError("email", "Email is Required", dispatch);
      return;
    } else if (isEmail(obj.email) === false) {
      dispatchAuthError("email", "Invalid email", dispatch);
      return;
    } else if (!obj.password) {
      dispatchAuthError("password", "Password is Required", dispatch);
      return;
    } else if (!obj.confirm_password) {
      dispatchAuthError(
        "confirm_password",
        "Confirm Password is Required",
        dispatch
      );
      return;
    } else if (obj.password != obj.confirm_password) {
      dispatchAuthError(
        "confirm_password",
        "Password shoule be matched with confirm password",
        dispatch
      );
      return;
    }
    dispatch(setAuthLoader(true));
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/signup`,
      obj
    );
    const { data, token } = response.data;
    dispatch(setLoginToken(data, token));
    return true;
  } catch (e) {
    dispatchAuthError(
      "error",
      getAPIResponseError(e) || "Unable to signup please try again",
      dispatch
    );
    return false;
  } finally {
    dispatch(setAuthLoader(false));
  }
};

export const googleAuth = (obj) => async (dispatch) => {
  try {
    dispatch(clearAuthResponseMsg());
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/googleAuth`,
      obj
    );
    const { data, token } = response.data;
    console.log(response);
    dispatch(setLoginToken(data, token));
    return true;
  } catch (e) {
    dispatchAuthError(
      "error",
      getAPIResponseError(e) || "Unable to signup please try again",
      dispatch
    );
    return false;
  } finally {
    dispatch(setAuthLoader(false));
  }
};

export const setLoginToken = (data, token) => async (dispatch) => {
  console.log(data, "setlogintoken");
  saveToken(token);
  const decoded = jwt_decode(token);
  console.log(decoded);
  dispatch(setCurrentUser(decoded));
  getProfile();
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch(clearAuthData());
};
export const getProfile = () => async (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/me`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((data) => {
      dispatch(setUserProfile(data.data));
    })
    .catch((e) => console.log(e));
};

export const updateProfile = (obj) => async (dispatch) => {
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL}/api/user/update`, obj, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((data) => {
      dispatch(setUserProfile(data.data));
    })
    .catch((e) => console.log(e));
};

function dispatchAuthError(field, msg, dispatch) {
  dispatch(setAuthResponseError({ field, msg }));
}
