import React from 'react'
import { CiStar } from "react-icons/ci";
import useFetch from '../../hooks/useFetch';
import url from '../../utils/baseUrl';

const FProperties = () => {
  const { data, loading, error}=useFetch(`${url}/hotels?featured=true&limit=4`)
    return (
        <div className="fproperties w-full max-w-6xl grid grid-cols-1 justify-between gap-5 md:grid-cols-2 lg:grid-cols-4">
           {loading ? (
        "Loading"
      ) : (
        <>
        {data.map((item)=>(

          <div className="fpItem flex-1 gap-2 flex flex-col" key={item._id} >
            <img
              src={item.photos[0]}
              alt=""
              className="fpImg w-full h-60 object-cover"
              />
            <span className="fpName font-bold">{item.name}</span>
              <span className="fpCity font-light">{item.city}</span>
            <span className="fpPrice font-medium">Starting from {item.cheapestPrice}$</span>
            <div className="fpRating flex gap-2">
              <button className=' flex px-3 text-white font-bold bg-blue-500 '>{item.rating}</button>
              <span className='text-sm'>Excellent</span>
            </div>
          </div>
        ))}
          </>
      )}
        </div>
      );
}

export default FProperties
