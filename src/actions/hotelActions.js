import * as actions from "./types";

/**
 * @desc Set Hotel Loader
 */
export const setHotelLoader = (payload) => {
  return {
    type: actions.SET_HOTEL_LOADER,
    payload: payload,
  };
};

/**
 * @desc Set Hotel User
 */
export const setHotel = (payload) => {
  return {
    type: actions.SET_HOTEL_DATA,
    payload: payload,
  };
};

/**
 * @desc Set Hotel Response Errors
 */
export const setHotelResponseError = (payload) => {
  let resError = {};
  resError[payload.field] = payload.msg;
  return {
    type: actions.SET_HOTEL_RES_ERROR,
    payload: resError,
  };
};

/**
 * @desc Set Hotel Response Success
 */
export const setHotelResponseSuccess = (payload) => {
  return {
    type: actions.SET_HOTEL_RES_SUCCESS,
    payload: payload,
  };
};

// clear auth data
export const clearHotelResponseMsg = () => {
  return {
    type: actions.CLEAR_HOTEL_RES_MSG,
  };
};

// clear Hotel data
export const clearHotelData = () => {
  return {
    type: actions.CLEAR_HOTEL_DATA,
  };
};
