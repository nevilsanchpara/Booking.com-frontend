// SearchItem.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Navbar from "../../components/navbar/Navbar";
import "../../components/searchItem/searchItem.css";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";

const SearchItem = () => {
  // Random hotel details for demonstration
  const [booking, setBooking] = useState();
  const nav = useNavigate();
  const hotel = {
    name: "Random Hotel",
    taxiOp: true,
    features: ["Free WiFi", "Swimming Pool", "Gym"],
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const handleGeneratePDF = () => {
    const element = document.getElementById("hotel-info");
    const opt = {
      margin: 10,
      filename: "booked_hotel_info.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
  };

  const fetchBooking = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/bookingByUserId`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    const { data } = res;
    setBooking(data.data);
    console.log(data.data);
    // console.log(booking, "booking");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-5">
        {!booking && (
          <div className="listResult flex flex-col space-y-4">
            <div className="animate-pulse h-60 bg-gray-200 rounded relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 opacity-50 animate-shine"></div>
            </div>
            <div className="animate-pulse h-60 bg-gray-200 rounded relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 opacity-50 animate-shine"></div>
            </div>
            <div className="animate-pulse h-60 bg-gray-200 rounded relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 opacity-50 animate-shine"></div>
            </div>
            <div className="animate-pulse h-60 bg-gray-200 rounded relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 opacity-50 animate-shine"></div>
            </div>
          </div>
        )}
        {booking?.length > 0 ? (
          booking?.map((b, i) => {
            return (
              <div key={i} className="searchItem lg:w-1/2 md:w-full">
                <img
                  src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
                  alt=""
                  className="siImg"
                />
                <div className="siDesc">
                  <h1 className="siTitle">{b.hotelId.name}</h1>
                  <span className="text-sm">{b.hotelId.address}</span>

                  {hotel.taxiOp && (
                    <span className="siTaxiOp">Free airport taxi</span>
                  )}
                  <div className="siFeatures">{hotel.features.join(", ")}</div>
                  <span className="siCancelOp">
                    <span className="text-red-600">Paid cancellation</span>
                  </span>
                  <span className="text-black text-[12px]">
                    CheckIn Date:{moment(b.startDate).format("DD-MM-YYYY")}
                  </span>
                  <span className="text-black text-[12px]">
                    CheckOut Date:{moment(b.endDate).format("DD-MM-YYYY")}
                  </span>

                  <div className="flex">
                    <span className="mr-2 text-sm text-black font-semibold">
                      Booked Rooms:
                    </span>
                    {b?.rooms.map((room) => {
                      return (
                        <span className="mr-2 text-sm text-gray-800 pt-[1px]">
                          {room}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="siDetails">
                  <div className="siRating">
                    <span>Excellent</span>
                    <button>4.5</button>
                  </div>
                  <div className="siDetailTexts">
                    <span className="siPrice">${b.amount}</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <span className="text-black text-[12px]">
                      <span className="font-bold text-black">Booked at: </span>
                      {moment(b.createdAt).format("DD-MM-YYYY hh:mm:ss A")}
                    </span>
                  </div>
                  {false ? (
                    <h2 className="text-[#3c6092] text-right font-semibold">
                      Leave Rating
                    </h2>
                  ) : (
                    <h2 className="text-[#3c6092] text-right">
                      <span className="font-semibold">Your Rating: </span>4 Star
                    </h2>
                  )}
                  <button
                    className="mt-4 px-[2px] py-[4px] bg-[#164484] text-white rounded-lg hover:bg-blue-600"
                    onClick={handleGeneratePDF}>
                    Download PDF
                  </button>
                </div>
                <div
                  id="hotel-info"
                  className="bg-white rounded-lg p-8 shadow-md hidden">
                  {/* <h1 className='text-3xl font-bold mb-4'>{b.hotelId.name}</h1>
                  <p className='mb-4'>{b.hotelId.address}</p>
                  <p className='mb-4'>
                    Room Numbers:{" "}
                    {b?.rooms.map((room) => {
                      return (
                        <span className='mr-2 text-sm text-gray-800 pt-[1px]'>
                          {room}
                        </span>
                      );
                    })}
                  </p>
                  <p className='mb-4'>GST: 18%, SGST: 9%, CGST: 9%</p>
                  <p className='mb-4'>
                    Booked at:{" "}
                    {moment(b.createdAt).format("DD-MM-YYYY hh:mm:ss A")}
                  </p>
                  <p className='mb-4'>
                    <span className='text-black text-[12px]'>
                      CheckIn Date:{moment(b.startDate).format("DD-MM-YYYY")}
                    </span>
                    <span className='text-black text-[12px]'>
                      CheckOut Date:{moment(b.endDate).format("DD-MM-YYYY")}
                    </span>{" "}
                  </p>
                  <p className='mb-4'>Paid Status: Success</p>
                  <p className='mb-4'>Amount: {b.amount}</p> */}
                  Nevil
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col">
            <h3>You haven't booked any Hotel till now</h3>
            <button
              className="bg-blue-700 text-white py-1 px-2 mt-5"
              onClick={() => nav("/")}>
              Book now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchItem;
