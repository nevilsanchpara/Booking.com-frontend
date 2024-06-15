// AddRoom.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddRoom = () => {
  const [facilities, setFacilities] = useState({
    petAllowed: false,
    freeWifi: false,
    breakfast: false,
    freeParking: false,
    dailyHousekeeping: false,
    elevator: false,
    bar: false,
    swimmingPool: false,
    garden: false,
    acRooms: false,
  });

  const [address, setAddress] = useState("");
  const [inputArray, setInputArray] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const newAddress = event.target.value;
      setInputArray([...inputArray, newAddress]);
      setAddress("");
    }
  };

  const handleRemove = (index) => {
    const updatedArray = inputArray.filter((_, i) => i !== index);
    setInputArray(updatedArray);
  };

  const [content, setContent] = useState();

  const handleTextChange = (value) => {
    setContent(value);
    console.log(value);
  };

  const handleFacilityChange = (event) => {
    const { id, checked } = event.target;
    setFacilities((prevFacilities) => ({
      ...prevFacilities,
      [id]: checked,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-3">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Add Room</h2>
      <div className="mt-4">
        <label htmlFor="bedroomType" className="block text-gray-700 font-bold">
          Bedroom Type
        </label>
        <select
          id="bedroomType"
          className="form-select mt-1 w-full border border-gray-300 rounded-md bg-gray-100 px-3 py-2 focus:bg-white focus:outline-none">
          <option value="Single bedroom">Single bedroom</option>
          <option value="King size bedroom">King size bedroom</option>
          <option value="Queen bedroom">Queen bedroom</option>
          <option value="Double room">Double room</option>
          <option value="Quad room">Quad room</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
          Room no.
        </label>
        <div className="mb-2">
          {inputArray.map((item, index) => (
            <span
              key={index}
              className="bg-gray-500 text-white px-2 text-[15px] py-[2px] rounded-full m-1">
              {item}
              <span
                className="cursor-pointer ml-2"
                onClick={() => handleRemove(index)}>
                &#x2716;
              </span>
            </span>
          ))}
        </div>
        <input
          type="text"
          id="address"
          className="form-input mt-1 w-full border border-gray-300 rounded-md bg-gray-100 px-3 py-2 focus:bg-white focus:outline-none"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold">
          Price
        </label>
        <input
          type="text"
          id="distance"
          name="distance"
          className="form-input mt-1 w-full border border-gray-300 rounded-md bg-gray-100 px-3 py-2 focus:bg-white focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold">
          Max guest
        </label>
        <input
          type="text"
          id="title"
          className="form-input mt-1 w-full border border-gray-300 rounded-md bg-gray-100 px-3 py-2 focus:bg-white focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold">
          Description
        </label>
        <ReactQuill value={content} onChange={handleTextChange} />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Facilities</label>
        <div className="space-y-2 grid grid-cols-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="petAllowed"
              className="form-checkbox mr-2"
              checked={facilities.petAllowed}
              onChange={handleFacilityChange}
            />
            <label htmlFor="petAllowed">Balcony View</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="freeWifi"
              className="form-checkbox mr-2"
              checked={facilities.freeWifi}
              onChange={handleFacilityChange}
            />
            <label htmlFor="freeWifi">Garden View</label>
          </div>
          {/* Add more facilities here */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="breakfast"
              className="form-checkbox mr-2"
              checked={facilities.breakfast}
              onChange={handleFacilityChange}
            />
            <label htmlFor="breakfast">Landmark View</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="freeParking"
              className="form-checkbox mr-2"
              checked={facilities.freeParking}
              onChange={handleFacilityChange}
            />
            <label htmlFor="freeParking">River view</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="dailyHousekeeping"
              className="form-checkbox mr-2"
              checked={facilities.dailyHousekeeping}
              onChange={handleFacilityChange}
            />
            <label htmlFor="dailyHousekeeping">Separate Bathroom</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="elevator"
              className="form-checkbox mr-2"
              checked={facilities.elevator}
              onChange={handleFacilityChange}
            />
            <label htmlFor="elevator">Tv</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="bar"
              className="form-checkbox mr-2"
              checked={facilities.bar}
              onChange={handleFacilityChange}
            />
            <label htmlFor="bar">Wifi</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="acRooms"
              className="form-checkbox mr-2"
              checked={facilities.acRooms}
              onChange={handleFacilityChange}
            />
            <label htmlFor="acRooms">AC Rooms</label>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Features</label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="freeCancellation"
              className="form-checkbox mr-2"
            />
            <label htmlFor="freeCancellation">Free Cancellation</label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Submit
      </button>
    </div>
  );
};

export default AddRoom;
