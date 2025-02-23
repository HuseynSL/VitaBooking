import React from "react";
import { Link } from "react-router-dom";

const SearchHotels = ({ item }) => {
  const getRatingLabel = (rating) => {
    if (rating < 3) return "Good";
    if (rating >= 3 && rating < 3.5) return "Very Good";
    if (rating >= 3.5 && rating < 4) return "Fabulous";
    if (rating >= 4 && rating < 4.5) return "Superb";
    if (rating >= 4.5 && rating <= 5) return "Exceptional";
    return "";
  };

  return (
    <div className="border border-gray-200 shadow-md rounded-xl p-4 flex gap-4 bg-white hover:shadow-lg transition-shadow duration-300">
      <img
        src={item.photos[0]}
        alt="Hotel"
        className="w-44 object-cover rounded-lg"
      />

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h1 className="text-lg font-semibold text-blue-500">{item.name}</h1>
          <span className="text-xs text-gray-500">{item.distance} from center</span>

          <p className="text-sm text-gray-600 mt-2">
            {item.desc.length > 100 ? `${item.desc.slice(0, 400)}...` : item.desc}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          {item.rating && (
            <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-md">
              <span className="text-xs font-medium text-gray-700">
                {getRatingLabel(item.rating)}
              </span>
              <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                {item.rating}
              </span>
            </div>
          )}

          <div className="text-right">
            <span className="text-xl font-semibold text-gray-800">${item.cheapestPrice}</span>
            <Link to={`/hotels/${item._id}`}>
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-1.5 px-4 rounded-md text-sm font-semibold hover:scale-105 transition-transform duration-200 ml-3">
                See availability
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHotels;
