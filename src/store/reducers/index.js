import { combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import hotelReducer from "./hotelReducer";
// import profileReducer from '../reducers/profileReducer';
// import queueReducer from '../reducers/queueReducer';

export default combineReducers({
  auth: authReducer,
  hotel: hotelReducer,
  // profile: profileReducer,
  // queue: queueReducer
});
