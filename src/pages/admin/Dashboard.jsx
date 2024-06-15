import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addHotel } from "./../../services/hotelService";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddHotel = (props) => {
  const [data, setData] = useState({
    hotelName: "",
    address: "",
    distance: "",
    type: "",
    city: "",
    time: {
      checkIn: "",
      checkOut: "",
    },
    price: "",
    images: [],
    description: "",
    facilities: {
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
    },
    features: {
      freeCancellation: false,
    },
  });

  const [imagePreviews, setImagePreviews] = useState([]); // State for image previews

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    // Update the data state with the selected images
    setData((prevData) => ({
      ...prevData,
      images: files,
    }));

    // Create image previews for selected images
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleTextChange = (value) => {
    setData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handleFacilityChange = (event) => {
    const { id, checked } = event.target;
    setData((prevData) => ({
      ...prevData,
      facilities: {
        ...prevData.facilities,
        [id]: checked,
      },
    }));
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFeatureChange = (event) => {
    const { id, checked } = event.target;
    setData((prevData) => ({
      ...prevData,
      features: {
        ...prevData.features,
        [id]: checked,
      },
    }));
  };

  const submitHandler = () => {
    console.log(data);
    const result = props.addHotel(data);
    if (result) {
      toast.success("Hotel Added Successfully!!!", {
        theme: "colored",
      });
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-3'>
      <h2 className='text-2xl font-bold text-blue-800 mb-4'>Add Hotel</h2>
      <div className='mb-4'>
        <label htmlFor='hotelName' className='block text-gray-700 font-bold'>
          Hotel Name
        </label>
        <input
          type='text'
          id='hotelName'
          value={data.hotelName}
          onChange={handleInputChange}
          className='form-input mt-1 w-full border border-gray-300 rounded-md bg-gray-100 px-3 py-2 focus:bg-white focus:outline-none'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='address' className='block text-gray-700 font-bold'>
          Address
        </label>
        <input
          type='text'
          id='address'
          value={data.address}
          onChange={handleInputChange}
          className='form-input mt-1 w-full border border-gray-300 rounded-md bg-gray-100 px-3 py-2 focus:bg-white focus:outline-none'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='address' className='block text-gray-700 font-bold'>
          Price
        </label>
        <input
          type='text'
          id='price'
          value={data.price}
          onChange={handleInputChange}
          className='form-input mt-1 w-full border border-gray-300 rounded-md bg-gray-100 px-3 py-2 focus:bg-white focus:outline-none'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='distance' className='block text-gray-700 font-bold'>
          Distance from city center
        </label>
        <input
          type='number'
          id='distance'
          name='distance'
          value={data.distance}
          onChange={handleInputChange}
          className='form-input mt-1 w-full border border-gray-300 rounded-md bg-gray-100 px-3 py-2 focus:bg-white focus:outline-none'
        />
        <p className='text-sm underline text-blue-700 mt-2 font-semibold mb-6'>
          <Link to='/'>Not sure? Calculate distance</Link>
        </p>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-bold'>
          Accommodation Type:
        </label>
        <select
          id='accommodationType'
          className='border rounded px-2 py-1 w-full'
          value={data.type}
          onChange={handleInputChange}>
          <option value=''>Select an option</option>
          <option value='Hotel'>Hotel</option>
          <option value='Private Villa'>Private Villa</option>
          <option value='Resort'>Resort</option>
        </select>
      </div>

      <div className='mb-4'>
        <label htmlFor='city' className='block text-gray-700 font-bold'>
          City
        </label>
        <input
          type='text'
          id='city'
          value={data.city}
          onChange={handleInputChange}
          className='form-input mt-1 w-full border border-gray-300 rounded-md bg-gray-100 px-3 py-2 focus:bg-white focus:outline-none'
        />
      </div>

      <div className='mb-4 flex justify-between'>
        <label className='text-gray-700 font-bold'>Check-In Time</label>
        <input
          type='time'
          value={data.time.checkIn}
          onChange={(event) =>
            setData({
              ...data,
              time: { ...data.time, checkIn: event.target.value },
            })
          }
          id='time.checkIn'
        />
        <div>
          <label className='text-gray-700 font-bold'>Check-Out Time</label>
          <input
            type='time'
            value={data.time.checkOut}
            onChange={(event) =>
              setData({
                ...data,
                time: { ...data.time, checkOut: event.target.value },
              })
            }
            id='time.checkOut'
          />
        </div>
      </div>

      <div className='mb-4'>
        <label htmlFor='description' className='block text-gray-700 font-bold'>
          Description
        </label>
        <ReactQuill value={data.description} onChange={handleTextChange} />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-bold'>Facilities</label>
        <div className='space-y-2 grid grid-cols-2'>
          {Object.entries(data.facilities).map(([key, value]) => (
            <div className='flex items-center' key={key}>
              <input
                type='checkbox'
                id={key}
                className='form-checkbox mr-2'
                checked={value}
                onChange={handleFacilityChange}
              />
              <label htmlFor={key}>{key}</label>
            </div>
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-bold'>Features</label>
        <div className='space-y-2'>
          {Object.entries(data.features).map(([key, value]) => (
            <div className='flex items-center' key={key}>
              <input
                type='checkbox'
                id={key}
                className='form-checkbox mr-2'
                checked={value}
                onChange={handleFeatureChange}
              />
              <label htmlFor={key}>{key}</label>
            </div>
          ))}
        </div>
      </div>
      <div className='mb-4'>
        <label htmlFor='images' className='block text-gray-700 font-bold'>
          Select Images (Multiple)
        </label>
        <input
          type='file'
          id='images'
          name='images'
          multiple
          onChange={handleImageChange}
          accept='image/*'
          className='form-input mt-1 w-full border border-gray-300 rounded-md bg-gray-100 px-3 py-2 focus:bg-white focus:outline-none'
        />
        {imagePreviews.length > 0 && (
          <div className='mt-2'>
            <p className='font-bold text-gray-700 mb-2'>Image Previews:</p>
            <div className='flex flex-wrap gap-4'>
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  className='w-32 h-32 object-cover rounded-md border border-gray-300'
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        type='submit'
        onClick={submitHandler}
        className='bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700'>
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addHotel,
})(AddHotel);
