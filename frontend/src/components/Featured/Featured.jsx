import React from 'react'

const Featured = () => {
    return (
        <div className="featured w-full max-w-6xl flex justify-between gap-5 z-10">
          <div className="featuredItem relative text-white border-8 overflow-hidden	h-60 flex-1">
            <img
              src="https://ychef.files.bbci.co.uk/960x540/p09vhml6.jpeg"
              alt=""
              className="featuredImg w-full h-full object-cover"
            />
            <div className="featuredTitles absolute bottom-[20px] left-[20px]">
              <h1>Baku</h1>
              <h2>77 properties</h2>
            </div>
          </div>
          
          <div className="featuredItem relative text-white border-8 overflow-hidden	h-60 flex-1">
            <img
              src="https://cf.bstatic.com/xdata/images/city/600x600/951152.jpg?k=e32222bac56155e39cf090dd4bab5e8ff176aa42a36641198d337bc87a1540b4&o="
              alt=""
              className="featuredImg w-full h-full object-cover"
            />
            <div className="featuredTitles absolute bottom-[20px] left-[20px]">
              <h1>Qax</h1>
              <h2>43 properties</h2>
            </div>
          </div>

          <div className="featuredItem relative text-white border-8 overflow-hidden	h-60 flex-1">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max500/113735231.jpg?k=f0db5ddd8158774eab865fe3867ce2042b54154172f9ac1bde86832c49499e70&o=&hp=1"
              alt=""
              className="featuredImg w-full h-full object-cover"
            />
            <div className="featuredTitles absolute bottom-[20px] left-[20px]">
              <h1>Sheki</h1>
              <h2>35 properties</h2>
            </div>
          </div>
        </div>
      );
}

export default Featured
