import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import { DateRange } from "react-date-range";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import SearchItem from "../../components/searchItem/SearchItem";

const List = () => {
  const location = useLocation();
  // const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  // const [options, setOptions] = useState(location.state.options);
  const [hotels, setHotels] = useState();
  const [city, setCity] = useState();
  const queryParams = new URLSearchParams(location.search);
  const cityQuery = queryParams.get("city");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(10000);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResult, setTotalResult] = useState(0);

  const handleSlide = (values) => {
    setMinBudget(values[0]);
    setMaxBudget(values[1]);
  };

  const navigate = useNavigate();

  const fetchHotels = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/hotel?city=${
          city?.toLocaleLowerCase() || cityQuery?.toLocaleLowerCase()
        }&minPrice=${minBudget}&maxPrice=${maxBudget}&page=${currentPage}`
      )
      .then((data) => {
        console.log(data);
        const {
          hotels: fetchedHotels,
          totalPages: fetchedTotalPages,
          totalItems,
        } = data.data;
        setHotels(fetchedHotels);
        setTotalPages(fetchedTotalPages);
        setTotalResult(totalItems);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchHotels();
  }, [minBudget, maxBudget, city, currentPage]);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={cityQuery}
                type="text"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <label className="text-gray-700 text-[18px]">
                  Budget Range:
                </label>
                <Slider
                  range
                  min={0}
                  max={10000}
                  step={100}
                  value={[minBudget, maxBudget]}
                  onChange={handleSlide}
                  trackStyle={[{ backgroundColor: "#3182ce" }]}
                  handleStyle={[
                    { borderColor: "#3182ce" },
                    { borderColor: "#3182ce" },
                  ]}
                  railStyle={{ backgroundColor: "#d1d5db" }}
                />
                <div className="mb-2">
                  <div className="text-[13px] text-gray-700">
                    Min Budget: {minBudget}
                  </div>
                  <div className="text-[13px] text-gray-700">
                    Max Budget: {maxBudget}
                  </div>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    // placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    // placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    // placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={fetchHotels}>Search</button>
          </div>
          {hotels ? (
            <div className="listResult">
              <h1 className="text-lg mb-2">
                Total {totalResult} Search result for{" "}
                <span className="font-semibold">{cityQuery || city}</span>
              </h1>
              {hotels?.map((hotel, i) => {
                return (
                  <div
                    key={i}
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/hotels/${hotel._id}?startDate=${startDate}&endDate=${endDate}`
                      )
                    }>
                    <SearchItem hotel={hotel} />
                  </div>
                );
              })}
              <div
                className={`pagination flex items-center justify-center mt-4 mb-10 ${
                  currentPage === 1 && "text-gray-500"
                }`}>
                <button
                  className="pagination-btn mr-2"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`pagination-btn mx-1 ${
                      currentPage === index + 1
                        ? "pagination-active bg-blue-500 px-3 text-white py-1"
                        : ""
                    }`}
                    onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                ))}
                <button
                  className={`pagination flex items-center justify-center mx-2 ${
                    currentPage === totalPages ? "text-gray-500" : "text-black"
                  }`}
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </div>
            </div>
          ) : (
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
        </div>
      </div>
    </div>
  );
};

export default List;
