import React from 'react'
import url from "../../utils/baseUrl.js"
import useFetch from "../../hooks/useFetch.js"
import { Link } from 'react-router-dom';

const SearchHotels = ({item}) => {

  const getRatingLabel = (rating) => {
    if (rating < 3) return "Good";
    if (rating >= 3 && rating < 3.5) return "Very Good";
    if (rating >= 3.5 && rating < 4) return "Fabulous";
    if (rating >= 4 && rating < 4.5) return "Superb";
    if (rating >= 4.5 && rating <= 5) return "Exceptional";
    return "";
  };
  return (
    <>
    
    <div className="searchHotel border-2 p-2 rounded-sm flex justify-between gap-5 mb-5">
      <img
        src={item.photos[0]}
        alt=""
        className="shImg w-48 object-cover"
      />

      <div className="shDesc flex flex-col gap-3 flex-2">
        <h1 className="shTitle font-sm text-blue-400">{item.name}</h1>
        <span className="shDistance text-xs">{item.distance} from center</span>
        <span className="shTaxiOp text-xs bg-green-400 text-white w-max p-1 border-4">Free airport taxi</span>
        <span className="shSubtitle text-xs font-bold">
          Studio Apartment with Air conditioning
        </span>
        <span className="shFeatures text-xs">
         {item.desc}
        </span>
        <span className="shCancelOp text-xs text-green-400 font-bold">Free cancellation </span>
        <span className="shCancelOpSubtitle text-xs text-green-400">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="shDetails flex-1 flex flex-col justify-between">

        {item.rating && 
          <div className="shRating flex justify-between">
          <span className='font-md'>{getRatingLabel(item.rating)}</span>
          <button className='bg-blue-500 text-white py-2 px-3 font-bold '>{item.rating}</button>
        </div>
        }

        <div className="shDetailTexts text-right flex flex-col gap-1">
          <span className="shPrice text-xl">${item.cheapestPrice}</span>
          <span className="shTaxOp text-xs text-gray">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="shCheckButton bg-blue-400 text-white font-bold py-2 px-1 cursor-pointer rounded-sm">See availability</button>
          </Link>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default SearchHotels
