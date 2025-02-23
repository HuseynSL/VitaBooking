import React from 'react';
import { CiStar } from 'react-icons/ci';
import useFetch from '../../hooks/useFetch';
import url from '../../utils/baseUrl';
import { useNavigate } from 'react-router-dom';

const FProperties = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`${url}/hotels?featured=true&limit=4`);

  return (
    <div className="fproperties w-full max-w-6xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 p-4">
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <>
          {data.map((item) => (
            <div
              className="fpItem bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-200 cursor-pointer"
              key={item._id}
              onClick={() => navigate(`/hotels/${item._id}`)}
            >
              <img
                src={item.photos[0]}
                alt={item.name}
                className="fpImg w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="fpName text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="fpCity text-sm text-gray-600 mb-2">{item.city}</p>
                <p className="fpPrice text-lg font-semibold text-blue-600 mb-2">
                  Starting from ${item.cheapestPrice}
                </p>
                <div className="fpRating flex items-center gap-2">
                  <button className="flex items-center justify-center px-3 py-1 text-white font-bold bg-blue-500 rounded-lg">
                    {item.rating}
                  </button>
                  <span className="text-sm text-gray-700">Excellent</span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FProperties;