import "./searchItem.css";

const SearchItem = ({hotel}) => {
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{hotel.name}</h1>
        <span className="siDistance">{hotel.distance} km from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <div className="siFeatures">
          {hotel.features[0]}
        </div>
        <span className="siCancelOp">{hotel.freeCancelation ? <span style={{color:"green"}}>Free cancellation</span> : <span style={{color:"red"}}> Paid cancellation</span>}</span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          {
            hotel.rating==0 ? 
            <button >New </button> : <button>{hotel.rating}</button>
          }
            
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${hotel.price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
