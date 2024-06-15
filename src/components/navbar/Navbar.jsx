import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { faSignOutAlt, faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout, getProfile } from "../../services/authService";

const Navbar = (props) => {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { auth } = props;
  useEffect(() => {
    if (Object.keys(auth.user) != 0) {
      setIsLoggedIn(true);
      // props.getProfile();
    }
  }, [auth]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.logout();
    setIsLoggedIn(false);
    nav("/auth");
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="logo text-2xl mt-2">Booking.com</span>
        </Link>
        <div className="navItems flex gap-4">
          {isLoggedIn ? (
            <>
              <div className="relative">
                <div
                  className="flex gap-2 hover:bg-blue-800 px-2 py-1 cursor-pointer"
                  onClick={handleDropdownClick}>
                  <button className=" text-blue-600 font-medium border-none cursor-pointer">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={
                        auth.userProfile.photo ||
                        "https://guiderealm.com/wp-content/uploads/2022/05/blank-default-tiktok-profile-picture.jpg"
                      }
                      alt="User Photo"
                    />
                  </button>
                  <h1 className="mt-2 font-bold text-sm">Your Account</h1>
                </div>
                {showDropdown && (
                  <div className="z-10 absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-lg">
                    <Link
                      className="block px-2 py-1 text-gray-800 bg-white"
                      to="/profile">
                      <FontAwesomeIcon icon={faCog} className="mr-2" />
                      My Profile
                    </Link>
                    <Link
                      className="block px-2 py-1 text-gray-800 bg-white"
                      to="/my-booking">
                      <FontAwesomeIcon icon={faCog} className="mr-2" />
                      My Booking
                    </Link>

                    <button
                      className="block px-2 py-1 text-gray-800 bg-white"
                      onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                className="bg-white text-blue-600 font-medium border-none py-1 px-4 cursor-pointer"
                onClick={() => nav("/auth")}>
                Register
              </button>
              <button
                className="bg-white text-blue-600 font-medium border-none py-1 px-4 cursor-pointer"
                onClick={() => nav("/auth")}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  logout,
  getProfile,
})(Navbar);
