import React from "react";
import url from "../../utils/baseUrl.js";
import useFetch from "../../hooks/useFetch.js";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`${url}/hotels/countByCity?cities=Baku,Quba,Sheki`);

  return (
    <div className="featured w-full mt-12 max-w-6xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        <div className="text-center text-gray-600">Loading, please wait...</div>
      ) : (
        <>
          <div
            onClick={() => navigate("/hotels?city=Baku")}
            className="featuredItem relative text-white rounded-lg overflow-hidden h-72 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src="https://ychef.files.bbci.co.uk/960x540/p09vhml6.jpeg"
              alt="Baku"
              className="featuredImg w-full h-full object-cover"
            />
            <div className="featuredTitles absolute bottom-6 left-6">
              <h1 className="text-2xl font-bold">Baku</h1>
              <h2 className="text-lg">{data[0]} properties</h2>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-10 transition-all duration-300"></div>
          </div>

          <div
            onClick={() => navigate("/hotels?city=Quba")}
            className="featuredItem relative text-white rounded-lg overflow-hidden h-72 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src="https://cf.bstatic.com/xdata/images/city/600x600/951152.jpg?k=e32222bac56155e39cf090dd4bab5e8ff176aa42a36641198d337bc87a1540b4&o="
              alt="Quba"
              className="featuredImg w-full h-full object-cover"
            />
            <div className="featuredTitles absolute bottom-6 left-6">
              <h1 className="text-2xl font-bold">Quba</h1>
              <h2 className="text-lg">{data[1]} properties</h2>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-10 transition-all duration-300"></div>
          </div>

          <div
            onClick={() => navigate("/hotels?city=Sheki")}
            className="featuredItem relative text-white rounded-lg overflow-hidden h-72 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max500/113735231.jpg?k=f0db5ddd8158774eab865fe3867ce2042b54154172f9ac1bde86832c49499e70&o=&hp=1"
              alt="Sheki"
              className="featuredImg w-full h-full object-cover"
            />
            <div className="featuredTitles absolute bottom-6 left-6">
              <h1 className="text-2xl font-bold">Sheki</h1>
              <h2 className="text-lg">{data[2]} properties</h2>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-10 transition-all duration-300"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;