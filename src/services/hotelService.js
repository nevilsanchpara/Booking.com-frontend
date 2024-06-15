import axios from "axios";
import {
  setHotel,
  setHotelResponseError,
  setHotelResponseSuccess,
  setHotelLoader,
  clearHotelData,
  clearHotelResponseMsg,
} from "../actions/hotelActions";
import jwt_decode from "jwt-decode";
import { isEmail, getAPIResponseError } from "../global/Helpers";

export const addHotel = (obj) => async (dispatch) => {
  try {
    dispatch(clearHotelResponseMsg());
    console.log("Hi", obj);
    if (!obj) {
      console.log("1");
      dispatchHotelError("name", "Hotel name is Required", dispatch);
      return;
    } else if (obj.type) {
      console.log("2");
      dispatchHotelError("type", "Type is Required", dispatch);
      return;
    } else if (!obj.address) {
      console.log("3");
      dispatchHotelError("address", "Address is Required", dispatch);
      return;
    } else if (!obj.distance) {
      console.log("4");
      dispatchHotelError("distance", "Distance is Required", dispatch);
      return;
    } else if (!obj.city) {
      console.log("5");
      dispatchHotelError("distance", "Enter valid Distance", dispatch);
      return;
    } else if (!obj.description) {
      console.log("6");
      dispatchHotelError("distance", "Enter valid Distance", dispatch);
      return;
    } else if (!obj.price) {
      console.log("7");
      dispatchHotelError("price", "price ", dispatch);
      return;
      // } else if (parseInt(obj.price) > 100 || parseInt(obj.price) < 100000) {
      //   console.log
      //   console.log("8");
      //   dispatchHotelError(
      //     "price",
      //     "Enter valid price from 100 to 1,00,000",
      //     dispatch
      //   );
      //   return;
    }
    // else if (!obj.checkIn || !obj..checkOut) {
    //   console.log("9");
    //   dispatchHotelError("price", "price", dispatch);
    //   return;
    // }
    console.log("hi__");

    const formData = new FormData();
    formData.append("name", obj.hotelName);
    const time = obj.time;
    for (const key in time) {
      if (time.hasOwnProperty(key)) {
        formData.append(`time[${key}]`, parseFloat(time[key]));
      }
    }
    formData.append("address", obj.address);
    formData.append("distance", parseInt(obj.distance));
    formData.append("type", obj.type);
    formData.append("city", obj.city);
    formData.append("description", obj.description);
    obj.images.map((img) => {
      formData.append("images", img);
    });
    // obj.images.forEach((image, index) => {
    //   formData.append(`images[${index}]`, image);
    // });

    const facilities = obj.facilities;
    for (const key in facilities) {
      if (facilities.hasOwnProperty(key)) {
        formData.append(`facilities[${key}]`, facilities[key].toString());
      }
    }

    dispatch(setHotelLoader(true));
    console.log("before");
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/hotel/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    // dispatch(setLoginToken(data, token));
    return true;
  } catch (e) {
    dispatchHotelError(
      "error",
      getAPIResponseError(e) || "Enter valid credentials please!!",
      dispatch
    );
    return false;
  } finally {
    dispatch(setHotelLoader(false));
  }
};

function dispatchHotelError(field, msg, dispatch) {
  dispatch(setHotelResponseError({ field, msg }));
}
