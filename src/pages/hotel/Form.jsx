import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { MdBalcony, MdOutlineBathroom } from "react-icons/md";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { AiOutlineWifi, AiOutlineClose } from "react-icons/ai";
import { GiHighGrass } from "react-icons/gi";
import { LiaLandmarkSolid } from "react-icons/lia";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaWater } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

const Hotel = (props) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [popup, setPopup] = useState(false);
  const [total, setTotal] = useState(0);
  const [roomNo, setRoomNo] = useState([]);
  const [paymentError, setPaymentError] = useState(null);
  const { id } = useParams();
  const { user } = props.auth;
  const stripe = useStripe();
  const elements = useElements();
  console.log(user, user._id, "____ID____");
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

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const paymentHandler = async (e) => {
    if (!elements) {
      console.log("No");
      return;
    }
    console.log(elements);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    console.log("inside2");
    console.log(error, "e");
    if (error) {
      setPaymentError(error.message);
      return;
    }
    console.log("inside 2");

    // const response = await axios.post("http://localhost:5000/api/payment", {
    //   paymentMethodId: paymentMethod.id,
    //   amount: 1000, // Set the appropriate amount
    //   currency: "USD", // Set the appropriate currency
    //   hotelId: id,
    //   email: "nevilsaspara@gmail.com",
    //   userId: user._id,
    // });

    // console.log(response);
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
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
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
            <button className="bookNow">Reserve or Book Now!</button>
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
              {photos.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.src}
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
            <div class="flex flex-col">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="shadow overflow-hidden border-b border-[#4C76B2]">
                    <table class="border border-[#5BBAFF] w-full">
                      <thead>
                        <tr class="bg-[#4C76B2] text-white">
                          <th class="px-4 py-2 border border-[#5BBAFF]">
                            Room Type
                          </th>
                          <th class="px-4 py-2 border border-[#5BBAFF]">
                            Number of guests
                          </th>
                          <th class="px-4 py-2 border border-[#5BBAFF] bg-[#003580]">
                            Price
                          </th>
                          <th class="px-4 py-2 border border-[#5BBAFF]">
                            Room No
                          </th>
                          <th class="px-4 py-2 border border-[#5BBAFF]">
                            Your choices
                          </th>
                          <th class="px-4 py-2 border border-[#5BBAFF]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {hotel?.rooms?.map((room, i) => {
                          return (
                            <tr>
                              <td class="border border-[#5BBAFF] px-4 py-2">
                                <div class="text-lg font-bold underline text-[#003580]">
                                  {room.name}
                                </div>
                                <div class="text-md font-semibold  text-[#2e6892] mb-2">
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
                              <td class="border border-[#5BBAFF] px-4 py-2">
                                <div class="text-sm text-gray-900">
                                  {room.noOfPeople} guests
                                </div>
                              </td>
                              <td class="border border-[#5BBAFF] px-4 py-2">
                                <div class="text-sm text-gray-900">
                                  ₹ {room.price}
                                </div>
                              </td>
                              <td class="border border-[#5BBAFF] px-4 py-2">
                                <div class="text-sm text-gray-900">
                                  <div className="flex justify-center">
                                    <div className="w-64">
                                      <p className="text-sm font-bold mb-4">
                                        Select a Room
                                      </p>
                                      <div className="grid grid-cols-5 gap-2">
                                        {room?.roomNo?.map((r) => {
                                          return (
                                            <button
                                              key={r}
                                              onClick={() => {
                                                setRoomNo((prev) => [
                                                  ...prev,
                                                  r,
                                                ]);
                                                setTotal(total + room.price);
                                              }}
                                              className={`px-1 py-2 border ${
                                                selectedSeats.includes(r.roomNo)
                                                  ? "bg-blue-500 text-white"
                                                  : "bg-gray-200 text-gray-700"
                                              } rounded-md`}>
                                              {r}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td class="border border-[#5BBAFF] px-4 py-2">
                                <div class="text-sm text-gray-900">
                                  ₹ {room.price}
                                </div>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {i == 0 && (
                                  <>
                                    <button
                                      class="mt-4 bg-[#0071c2] hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                                      onClick={() => setPopup(true)}>
                                      Book Now
                                    </button>
                                    <h1>total: {total}</h1>
                                  </>
                                )}

                                {popup && (
                                  <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-[1px]">
                                    <div className="bg-[#0071c2] p-8 rounded-lg shadow-lg relative flex flex-col items-center">
                                      <h2 className="text-lg font-bold mb-4 text-white">
                                        Billing
                                      </h2>
                                      <button
                                        className="absolute top-2 right-2"
                                        onClick={() => setPopup(false)}>
                                        <AiOutlineClose color="white" />
                                      </button>
                                      <h1 className="text-white text-center">
                                        Total is {total}
                                      </h1>
                                      <h1 className="text-white text-center">
                                        Total is {total}.. You have booked 2
                                        rooms
                                      </h1>
                                      <button
                                        className="bg-[#003580] px-3 py-1 mt-2 text-white rounded-xl"
                                        onClick={paymentHandler}>
                                        Pay now
                                      </button>
                                      {paymentError && (
                                        <div>{paymentError}</div>
                                      )}
                                      <h6>Your room no. are</h6>
                                      {roomNo.map((r) => {
                                        return (
                                          <div className="flex flex-row">
                                            <p className="text-white">{r}</p>
                                          </div>
                                        );
                                      })}
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
