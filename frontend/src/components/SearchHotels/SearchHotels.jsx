import React from 'react'

const SearchHotels = () => {
  return (
    <>
    
    <div className="searchHotel border-2 p-2 rounded-sm flex justify-between gap-5 mb-5">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="shImg w-48 object-cover"
      />
      <div className="shDesc flex flex-col gap-3 flex-2">
        <h1 className="shTitle font-sm text-blue-400">Tower Street Apartments</h1>
        <span className="shDistance text-xs">500m from center</span>
        <span className="shTaxiOp text-xs bg-green-400 text-white w-max p-1 border-4">Free airport taxi</span>
        <span className="shSubtitle text-xs font-bold">
          Studio Apartment with Air conditioning
        </span>
        <span className="shFeatures text-xs">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="shCancelOp text-xs text-green-400 font-bold">Free cancellation </span>
        <span className="shCancelOpSubtitle text-xs text-green-400">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="shDetails flex-1 flex flex-col justify-between">
        <div className="shRating flex justify-between">
          <span className='font-md'>Excellent</span>
          <button className='bg-blue-500 text-white p-1 font-bold '>8.9</button>
        </div>
        <div className="shDetailTexts text-right flex flex-col gap-1">
          <span className="shPrice text-xl">$112</span>
          <span className="shTaxOp text-xs text-gray">Includes taxes and fees</span>
          <button className="shCheckButton bg-blue-400 text-white font-bold py-2 px-1 cursor-pointer rounded-sm">See availability</button>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default SearchHotels
