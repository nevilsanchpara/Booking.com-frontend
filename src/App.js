import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import Profile from "./pages/profile/profile";
import Auth from "./pages/auth/Auth";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import List from "./pages/list/List";
import jwt_decode from "jwt-decode";
import "./App.css";
import { setCurrentUser, setUserProfile } from "./actions/authActions";
import PrivateRouter from "./PrivateRouter";
import MyBooking from "./pages/booking/MyBooking";
import Dashboard from "./pages/admin/Dashboard";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import Sidebar from "./components/sidebar/Sidebar";
import AddRoom from "./pages/admin/AddRoom";

function App() {
  // const token = localStorage.getItem("token");
  // if (token) {
  //   store.dispatch(setCurrentUser(jwt_decode(token)));
  // }

  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((data) => {
        store.dispatch(setCurrentUser(jwt_decode(token)));
        // store.dispatch(setUserProfile());
      })
      .catch((e) => {
        console.log(e);
        localStorage.removeItem("token");
      });
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/my-booking/" element={<MyBooking />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
          </Route>
          <Route
            path="profile"
            element={
              <PrivateRouter isAuthenticated={true}>
                <Profile />
              </PrivateRouter>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
