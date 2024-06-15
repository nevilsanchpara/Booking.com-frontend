import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { connect, useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../../services/authService";
import { setUserProfile } from "../../actions/authActions";

const Profile = (props) => {
  const [data, setData] = useState({});
  const [initialData, setInitialData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProfile = async () => {
      const profileData = await props.getProfile();
      setData(profileData);
      setInitialData(profileData);
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (props.auth.userProfile) {
      setData(props.auth.userProfile);
      setInitialData(props.auth.userProfile);
    }
  }, [props.auth.userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await props.updateProfile(data);
    dispatch(setUserProfile(data));
    setInitialData(data);
  };

  const handleCancel = () => {
    setData(initialData);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6">User Profile</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={handleChange}
              value={data?.name | ""}
              name="name"
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="displayName"
              className="block text-gray-700 font-semibold mb-2">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              onChange={handleChange}
              value={data?.nickName || ""}
              name="nickName"
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              value={data?.email || ""}
              name="email"
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              onChange={handleChange}
              value={data?.phoneNumber || ""}
              name="phoneNumber"
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dob"
              className="block text-gray-700 font-semibold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              onChange={handleChange}
              value={data?.dob || ""}
              name="dob"
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nationality"
              className="block text-gray-700 font-semibold mb-2">
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              onChange={handleChange}
              value={data?.nationality || ""}
              name="nationality"
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 font-semibold mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              onChange={handleChange}
              value={data?.gender || ""}
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold mb-2">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              onChange={handleChange}
              value={data?.address || ""}
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2">
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 font-semibold rounded-md px-4 py-2 ml-4">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  getProfile,
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
