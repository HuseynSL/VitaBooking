import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchHotels from "../SearchHotels/SearchHotels";

const ListSlider = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  return (
    <>
      <div className="listSearch text-white flex-1 bg-blue-600 p-2 border-8 sticky top-[10px] h-max">
        <h1 className="lsTitle text-sm text-white mb-2">Search</h1>

        <div className="lsItem flex flex-col gap-2 mb-3">
          <label className="text-xs ">Destination</label>
          <input
            className="h-8 p-1 text-black"
            placeholder={destination}
            type="text"
          />
        </div>

        <div className="lsItem flex flex-col gap-2 mb-3">
          <label className="text-xs">Check-in Date</label>
          <span
            className="h-8 p-1 bg-white flex items-center text-black cursor-pointer"
            onClick={() => setOpenDate(!openDate)}
          >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
            date[0].endDate,
            "MM/dd/yyyy"
          )}`}</span>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              ranges={date}
            />
          )}
        </div>

        <div className="lsItem flex flex-col gap-2 mb-3">
          <label>Options</label>
          <div className="lsOptions p-2">
            <div className="lsOptionItem flex justify-between mb-3 text-xs">
              <span className="lsOptionText">
                Min price <small>per night</small>
              </span>
              <input
                type="number"
                className="lsOptionInput h-8 p-1 text-black w-12"
                placeholder="49"
              />
            </div>

            <div className="lsOptionItem flex justify-between mb-3 text-xs">
              <span className="lsOptionText">
                Max price <small>per night</small>
              </span>
              <input
                type="number"
                className="lsOptionInput h-8 p-1 text-black w-12"
                placeholder="9999"
              />
            </div>

            <div className="lsOptionItem flex justify-between mb-3 text-xs">
              <span className="lsOptionText">Adult</span>
              <input
                type="number"
                min={1}
                className="lsOptionInput h-8 p-1 text-black w-12"
                placeholder={options.adult}
              />
            </div>

            <div className="lsOptionItem flex justify-between mb-3 text-xs">
              <span className="lsOptionText">Children</span>
              <input
                type="number"
                min={0}
                className="lsOptionInput h-8 p-1 text-black w-12"
                placeholder={options.children}
              />
            </div>

            <div className="lsOptionItem flex justify-between mb-3 text-xs">
              <span className="lsOptionText">Room</span>
              <input
                type="number"
                min={1}
                className="lsOptionInput h-8 p-1 text-black w-12"
                placeholder={options.room}
              />
            </div>
          </div>
        </div>

        <button className="p-2 bg-yellow-500 text-white w-full font-md cursor-pointer">
          Search
        </button>
      </div>
      <div className="listResult flex-3">
        <SearchHotels />
        <SearchHotels />
        <SearchHotels />
        <SearchHotels />
        <SearchHotels />
        <SearchHotels />
      </div>
    </>
  );
};

export default ListSlider;
