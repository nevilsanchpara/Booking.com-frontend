import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import "../../components/header/header.css";
import axios from "axios";
import { MdBalcony, MdOutlineBathroom } from "react-icons/md";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { AiOutlineWifi, AiOutlineClose } from "react-icons/ai";
import { GiHighGrass } from "react-icons/gi";
import { LiaLandmarkSolid } from "react-icons/lia";
import { isToday } from "date-fns";
import { FaWater } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  faCalendarDays,
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";

const Hotel = (props) => {
  const nav = useNavigate();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const location = useLocation();
  const [popup, setPopup] = useState(false);
  const [total, setTotal] = useState(0);
  const [roomData, setRoomData] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const { id } = useParams();
  const [paymentId, setPaymentId] = useState("");
  const [orderId, setOrderId] = useState("");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const bookRef = useRef(null);

  useEffect(() => {
    const start = moment.utc(startDate, "DD-MM-YYYY").toDate();
    const end = moment.utc(endDate, "DD-MM-YYYY").toDate();
    const datesArray = [];
    let current = moment(start);
    while (current.isSameOrBefore(end)) {
      datesArray.push(current.utc().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"));
      current.add(1, "day");
    }
    setSelectedDate(datesArray);
  }, []);

  const isRoomAvailable = (room) => {
    if (room.unAvailability.length === 0) return true;
    const today = new Date();
    for (const unavail of room.unAvailability) {
      for (const date of unavail.date) {
        const unavailDate = new Date(date);
        if (isToday(unavailDate)) {
          return false;
        }
      }
    }
    return true;
  };

  const handleRoomClick = (_id, roomNo) => {
    setRoomData((prevData) => {
      const existingRoom = prevData.find((item) => item._id === _id);
      if (existingRoom) {
        const updatedRoomNoArray = existingRoom.roomNo.includes(roomNo)
          ? existingRoom.roomNo.filter((no) => no !== roomNo)
          : [...existingRoom.roomNo, roomNo];

        return prevData.map((item) =>
          item._id === _id ? { ...item, roomNo: updatedRoomNoArray } : item
        );
      } else {
        return [...prevData, { _id, roomNo: [roomNo] }];
      }
    });
  };

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const { auth } = props;
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    const stripe = await loadStripe(
      "pk_test_51NUYeFSHswC3Ecrci4ColRXB2LU2pzUz2nVGJ8d0yUyhhoAzNdOYQ59YMP4DU6dAzKFsxOAiLyZJTcD44V58MrhS00xCehxePP"
    );

    const headers = {
      "Content-Type": "application/json",
    };

    console.log(auth?.user._id, "userid");

    const d = {
      amount: total,
      orderId,
      rooms: selectedRooms,
      userId: auth?.user._id,
      hotelId: id,
      startDate,
      endDate,
      roomData,
      hotelName: hotel?.name,
    };
    const body = JSON.stringify(d);

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/payment/`,
      {
        method: "POST",
        headers,
        body: body,
      }
    );

    const session = await response.json();
    stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const [hotel, setHotel] = useState();

  const getHotel = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/room/hotel/${id}`)
      .then((res) => {
        setHotel(res.data);
      });
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img
                src={hotel?.images[slideNumber]}
                alt=""
                className="sliderImg"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        {hotel ? (
          <div className="hotelWrapper">
            <button
              className="bookNow"
              onClick={() => {
                if (bookRef.current) {
                  bookRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}>
              Book Now!
            </button>
            <h1 className="hotelTitle">{hotel?.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span className="text-[16px]">{hotel?.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {hotel?.distance} km from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over $114 at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {hotel?.images?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt="hotel"
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>

            <div className="hotelDetails mb-5">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay in the heart of City</h1>
                <p className="hotelDesc">{hotel?.description}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a 9-night stay!</h1>
                <span>
                  Located in the real heart of {hotel?.city}, this property has
                  an excellent location score of {hotel?.rating}!
                </span>
                <h2>
                  <b>${hotel?.price}</b>
                </h2>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-[#4C76B2]">
                    <table
                      className="border border-[#5BBAFF] w-full"
                      ref={bookRef}>
                      <thead>
                        <tr className="bg-[#4C76B2] text-white">
                          <th className="px-4 py-2 border border-[#5BBAFF]">
                            Room Type
                          </th>
                          <th className="px-4 py-2 border border-[#5BBAFF]">
                            Number of guests
                          </th>
                          <th className="px-4 py-2 border border-[#5BBAFF] bg-[#003580]">
                            Price
                          </th>
                          <th className="px-4 py-2 border border-[#5BBAFF]">
                            Room No
                          </th>
                          <th className="px-4 py-2 border border-[#5BBAFF]">
                            Your choices
                          </th>
                          <th className="px-4 py-2 border border-[#5BBAFF]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {hotel?.rooms?.map((room, i) => {
                          const isAvailable = isRoomAvailable(room);
                          return (
                            <tr key={i}>
                              <td className="border border-[#5BBAFF] px-4 py-2">
                                <div className="text-lg font-bold underline text-[#003580]">
                                  {room.name}
                                </div>
                                <div className="text-md font-semibold  text-[#2e6892] mb-2">
                                  {room.type}
                                </div>
                                <div className="flex flex-col text-sm">
                                  <span className="flex">
                                    <MdBalcony className="mt-[2px] mr-1" />{" "}
                                    Balcony
                                  </span>
                                  <span className="flex">
                                    <PiTelevisionSimpleLight className="mt-[2px] mr-1" />{" "}
                                    Tv
                                  </span>
                                  <span className="flex">
                                    <AiOutlineWifi className="mt-[2px] mr-1" />{" "}
                                    Wifi
                                  </span>
                                  <span className="flex">
                                    <GiHighGrass className="mt-[2px] mr-1" />{" "}
                                    Garden View
                                  </span>
                                  <span className="flex">
                                    <LiaLandmarkSolid className="mt-[2px] mr-1" />{" "}
                                    Landmark View
                                  </span>
                                  <span className="flex">
                                    <FaWater className="mt-[2px] mr-1" /> River
                                    View
                                  </span>
                                  <span className="flex">
                                    <MdOutlineBathroom className="mt-[2px] mr-1" />
                                    Bathroom
                                  </span>
                                </div>
                              </td>
                              <td className="border border-[#5BBAFF] px-4 py-2">
                                <div className="text-sm text-gray-900">
                                  {room.noOfPeople} guests
                                </div>
                              </td>
                              <td className="border border-[#5BBAFF] px-4 py-2">
                                <div className="text-sm text-gray-900">
                                  $ {room.price}
                                </div>
                              </td>
                              <td className="border border-[#5BBAFF] px-4 py-2">
                                <div className="text-sm text-gray-900">
                                  <div className="flex justify-center">
                                    <div className="w-64">
                                      <p className="text-sm font-bold mb-4">
                                        Select a Room
                                      </p>
                                      <div className="grid grid-cols-5 gap-2">
                                        {room?.unAvailability.map((r) => {
                                          const isDisabled = () => {
                                            for (const date of r.date) {
                                              if (selectedDate.includes(date)) {
                                                return true;
                                              }
                                            }
                                            return false;
                                          };
                                          const disabled = isDisabled();

                                          return (
                                            <button
                                              disabled={disabled}
                                              key={r._id}
                                              onClick={() => {
                                                if (
                                                  selectedRooms.includes(
                                                    r.roomNo
                                                  )
                                                ) {
                                                  setSelectedRooms(
                                                    selectedRooms.filter(
                                                      (d) => d != r.roomNo
                                                    )
                                                  );
                                                  setTotal(total - room.price);
                                                } else {
                                                  setSelectedRooms((prev) => [
                                                    ...prev,
                                                    r.roomNo,
                                                  ]);
                                                  setError("");
                                                  setTotal(total + room.price);
                                                }
                                                handleRoomClick(
                                                  room._id,
                                                  r.roomNo
                                                );
                                              }}
                                              className={`px-1 py-2 border

                                               ${
                                                 selectedRooms.includes(
                                                   r.roomNo
                                                 )
                                                   ? "bg-yellow-300 text-black" // If selected, use yellow background and black text
                                                   : disabled
                                                   ? "bg-gray-400 text-black cursor-not-allowed" // If disabled, use gray background and black text
                                                   : "bg-blue-800 text-white"
                                               }
                                               rounded-md`}>
                                              {r.roomNo}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="border border-[#5BBAFF] px-4 py-2">
                                <div className="text-sm text-gray-900">
                                  ₹ {room.price}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {i == 0 && (
                                  <>
                                    <button
                                      className="mt-4 bg-[#0071c2] hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                                      onClick={() => {
                                        if (selectedRooms.length == 0) {
                                          setError("Select a room");
                                          return;
                                        }
                                        setPopup(true);
                                      }}>
                                      Book Now
                                    </button>
                                    <h1>total: {total}</h1>
                                    {error && (
                                      <h1 className="text-red-600">{error}</h1>
                                    )}
                                  </>
                                )}

                                {popup && (
                                  <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-[1px]">
                                    <div className="bg-[#0071c2] p-8 rounded-lg shadow-lg relative flex flex-col items-center w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%]">
                                      <div className="bg-[#003580] h-8 w-full rounded-t-lg absolute top-0 left-0 flex items-center justify-center">
                                        <h2 className="text-lg font-bold text-white">
                                          Pay for Room
                                        </h2>
                                      </div>
                                      <button
                                        className="absolute top-2 right-2"
                                        onClick={() => setPopup(false)}>
                                        <AiOutlineClose color="white" />
                                      </button>
                                      <h1 className="text-white text-center mt-4">
                                        Total is {total}. You have booked{" "}
                                        {selectedRooms.length}{" "}
                                        {selectedRooms.length === 1
                                          ? "room"
                                          : "rooms"}
                                        .
                                      </h1>
                                      <div className="flex flex-col space-y-2 mt-4 text-white">
                                        <div className="flex flex-row">
                                          <span className="w-1/2 text-center">
                                            Check-In:
                                          </span>
                                          <span className="w-1/2 text-center">
                                            {startDate}
                                          </span>
                                        </div>
                                        <div className="flex flex-row">
                                          <span className="w-1/2 text-center">
                                            Check-Out:
                                          </span>
                                          <span className="w-1/2 text-center">
                                            {endDate}
                                          </span>
                                        </div>
                                        <h6 className="text-white">
                                          Your room numbers:
                                        </h6>
                                        {selectedRooms.map((r) => {
                                          return (
                                            <div
                                              key={r}
                                              className="flex flex-row justify-center">
                                              <p className="text-white">{r}</p>
                                            </div>
                                          );
                                        })}
                                      </div>
                                      <div className="mt-auto">
                                        <button
                                          className="bg-[#003580] mt-3 px-4 py-2 text-white rounded-xl"
                                          onClick={paymentHandler}>
                                          Pay now
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hotelWrapper">
            <button className="bookNow animate-pulse bg-gray-300 h-10 w-36 rounded-md"></button>
            <h1 className="hotelTitle mt-4 animate-pulse bg-gray-300 h-8 w-64 rounded-md"></h1>
            <div className="hotelAddress flex items-center mt-2 animate-pulse">
              <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
              <span className="ml-2 bg-gray-300 h-4 w-32 rounded-md"></span>
            </div>
            <span className="hotelDistance mt-2 animate-pulse bg-gray-300 h-4 w-64 rounded-md"></span>
            <span className="hotelPriceHighlight mt-2 animate-pulse bg-gray-300 h-4 w-96 rounded-md"></span>
            <div className="hotelImages mt-4 flex space-x-4 animate-pulse">
              <div className="hotelImgWrapper bg-gray-300 h-32 w-32 rounded-md"></div>
              <div className="hotelImgWrapper bg-gray-300 h-32 w-32 rounded-md"></div>
              <div className="hotelImgWrapper bg-gray-300 h-32 w-32 rounded-md"></div>
            </div>

            <div className="hotelDetails mb-5 mt-8">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle mt-2 animate-pulse bg-gray-300 h-8 w-96 rounded-md"></h1>
                <p className="hotelDesc mt-2 animate-pulse bg-gray-300 h-4 w-96 rounded-md"></p>
              </div>
              <div className="hotelDetailsPrice mt-4">
                <h1 className="animate-pulse bg-gray-300 h-6 w-56 rounded-md"></h1>
                <span className="mt-2 animate-pulse bg-gray-300 h-4 w-96 rounded-md"></span>
                <h2 className="mt-2 animate-pulse bg-gray-300 h-6 w-20 rounded-md"></h2>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-[#4C76B2]">
                    <table className="border border-[#5BBAFF] w-full">
                      <thead>
                        <tr className="bg-[#4C76B2] text-white">
                          <th className="px-4 py-2 border border-[#5BBAFF] animate-pulse bg-gray-300 h-8 rounded-md"></th>
                          <th className="px-4 py-2 border border-[#5BBAFF] animate-pulse bg-gray-300 h-8 rounded-md"></th>
                          <th className="px-4 py-2 border border-[#5BBAFF]  animate-pulse bg-gray-300 h-8 rounded-md"></th>
                          <th className="px-4 py-2 border border-[#5BBAFF] animate-pulse bg-gray-300 h-8 rounded-md"></th>
                          <th className="px-4 py-2 border border-[#5BBAFF] animate-pulse bg-gray-300 h-8 rounded-md"></th>
                          <th className="px-4 py-2 border border-[#5BBAFF]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-[#5BBAFF] px-4 py-2">
                            <div className="text-lg font-bold underline text-[#003580] animate-pulse bg-gray-300 h-6 w-48 rounded-md"></div>
                            <div className="text-md font-semibold text-[#2e6892] mt-2 animate-pulse bg-gray-300 h-4 w-56 rounded-md"></div>
                            <div className="flex flex-col mt-2 animate-pulse">
                              <span className="flex bg-gray-300 h-4 w-20 rounded-md"></span>
                              <span className="flex bg-gray-300 h-4 w-20 rounded-md"></span>
                              <span className="flex bg-gray-300 h-4 w-20 rounded-md"></span>
                              <span className="flex bg-gray-300 h-4 w-20 rounded-md"></span>
                              <span className="flex bg-gray-300 h-4 w-20 rounded-md"></span>
                              <span className="flex bg-gray-300 h-4 w-20 rounded-md"></span>
                              <span className="flex bg-gray-300 h-4 w-20 rounded-md"></span>
                            </div>
                          </td>
                          <td className="border border-[#5BBAFF] px-4 py-2 animate-pulse bg-gray-300 h-6 w-20 rounded-md"></td>
                          <td className="border border-[#5BBAFF] px-4 py-2 animate-pulse bg-gray-300 h-6 w-20 rounded-md"></td>
                          <td className="border border-[#5BBAFF] px-4 py-2 animate-pulse bg-gray-300 h-6 w-20 rounded-md"></td>
                          <td className="border border-[#5BBAFF] px-4 py-2 animate-pulse bg-gray-300 h-6 w-20 rounded-md"></td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <MailList />
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Hotel);
