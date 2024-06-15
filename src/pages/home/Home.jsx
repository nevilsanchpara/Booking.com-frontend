import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import { connect } from "react-redux";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchItem from "../../components/searchItem/SearchItem";
import moment from "moment";

const Home = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const [hotels, setHotels] = useState();
  const startDate = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  const formattedStartDate = moment(startDate).format("DD/MM/YYYY");
  const formattedEndDate = moment(endDate).format("DD/MM/YYYY");

  const fetchHotels = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/hotel?&page=${currentPage}`
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

  const navigate = useNavigate();
  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        {/* <h1 className='homeTitle'>Browse by property type</h1> */}
        {/* <PropertyList /> */}
        {/* <h1 className='homeTitle'>Homes guests love</h1> */}
        {/* <FeaturedProperties /> */}
        <h1 className="font-bold text-2xl">Top Hotels</h1>
        <div className="listContainer lg:w-[75%]">
          <div className="listWrapper">
            {hotels ? (
              <div className="listResult">
                {hotels?.map((hotel, i) => {
                  return (
                    <div
                      key={i}
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/hotels/${hotel._id}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
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
                      currentPage === totalPages
                        ? "text-gray-500"
                        : "text-black"
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

        <MailList />
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Home);
