import * as actions from "../../actions/types";

const initialState = {
  resError: {},
  resSuccess: "",
  loading: false,
  hotel: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SET_HOTEL_LOADER:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.SET_HOTEL_DATA:
      return {
        ...state,
        hotel: action.payload,
      };
    case actions.SET_HOTEL_RES_ERROR:
      return {
        ...state,
        resError: action.payload,
      };
    case actions.SET_HOTEL_RES_SUCCESS:
      return {
        ...state,
        resSuccess: action.payload,
      };
    case actions.CLEAR_HOTEL_RES_MSG:
      return {
        ...state,
        resError: {},
        resSuccess: "",
      };
    case actions.CLEAR_HOTEL_DATA:
      return initialState;
    default:
      return state;
  }
}
