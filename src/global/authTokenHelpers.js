import { deleteAllData, saveData } from "./localStorageHelpers";
import axios from "axios";
export const saveToken = (token) => {
  setAuthToken(token);
  saveData("token", token);
};

export const clearToken = () => {
  clearAuthToken();
  deleteAllData();
};

const setAuthToken = (token) => {
  try {
    console.log(token, "SetAuthToken");
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : null;
  } catch (e) {
    console.log("Error while setting up token", e);
  }
};

const clearAuthToken = () => {
  delete axios.defaults.headers.common["Authorization"];
};
