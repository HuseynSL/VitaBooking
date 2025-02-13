import React, { useState } from "react";
import style from "./style.module.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { IoBed } from "react-icons/io5";
import { MdFlightTakeoff } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { MdAttractions } from "react-icons/md";
import { BsFillTaxiFrontFill } from "react-icons/bs";
import { IoIosBed } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };
  
  return (
    <>
      <div className="header w-full bg-yellow-500">
        <div className={style.container}>
          <div className="headerList flex gap-5 text-white text-">
            <div className="headerListItem flex gap-2 border-2 rounded-full p-2 text-md">
              <span className="pt-1">
                <IoBed />
              </span>
              <span>Stays</span>
            </div>
            <div className="headerListItem flex gap-2 p-2 text-md">
              <span className="pt-1">
                <MdFlightTakeoff />
              </span>
              <span>Flight</span>
            </div>
            <div className="headerListItem flex gap-2 p-2 text-md">
              <span className="pt-1">
                <FaCar />
              </span>
              <span>Car</span>
            </div>
            <div className="headerListItem flex gap-2 p-2 text-md">
              <span className="pt-1">
                <MdAttractions />
              </span>
              <span>Attractions</span>
            </div>
            <div className="headerListItem flex gap-2 p-2 text-md">
              <span className="pt-1">
                <BsFillTaxiFrontFill />
              </span>
              <span>Airport Taxis</span>
            </div>
          </div>

          <div className="headerContent flex  flex-col gap-5 text-white py-16">
            <h1 className="font-bold text-5xl">Find your next stay</h1>
            <p className="text-2xl">
              Search low prices on hotels, homes and much more...
            </p>
          </div>

          <div className="headerSearch w-full flex justify-around py-10 rounded-xl absolute h-8 bg-white border-2 border-blue-500  bottom-[-30px] pt-8">
            {/* search*/}
            <div className="headerSearchItem flex items-center gap-5">
              <span className="headerIcon">
                <IoIosBed />
              </span>
              <input
                type="text"
                placeholder="Where are you going?"
                className="headerSearchInput border-0 outline-0"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            {/* date */}
            <div className="headerSearchItem flex items-center gap-5">
              <span className="headerIcon">
                <FaCalendarAlt />
              </span>
              <span
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchText text-gray-500 cursor-pointer"
              >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="date absolute top-[50px] z-20"
                  minDate={new Date()}
                />
              )}
            </div>
            {/* people */}
            <div className="headerSearchItem flex items-center gap-5">
              <span className="headerIcon">
                <IoPersonOutline />
              </span>
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="headerSearchText text-gray-500 cursor-pointer"
              >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
              {openOptions && (
                <div className="options z-20 absolute top-[50px] bg-white text-gray border-4 shadow-[0px_0px_10px_-5px_rgba(0,0,0,0.4)]">
                  <div className="optionItem w-52 flex justify-between m-[10px]">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter flex items-center gap-3">
                      <button
                        disabled={options.adult <= 1}
                        className="optionCounterButton w-8 h-8 border-2 border-blue-500 text-blue-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={() => handleOption("adult", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.adult}
                      </span>
                      <button
                        className="optionCounterButton w-8 h-8 border-2 border-blue-500 text-blue-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={() => handleOption("adult", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="optionItem w-52 flex justify-between m-[10px]">
                    <span className="optionText">Children</span>
                    <div className="optionCounter flex items-center gap-3">
                      <button
                        disabled={options.children <= 0}
                        className="optionCounterButton w-8 h-8 border-2 border-blue-500 text-blue-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={() => handleOption("children", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.children}
                      </span>
                      <button
                        className="optionCounterButton w-8 h-8 border-2 border-blue-500 text-blue-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={() => handleOption("children", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="optionItem w-52 flex justify-between m-[10px]">
                    <span className="optionText">Room</span>
                    <div className="optionCounter flex items-center gap-3">
                      <button
                        disabled={options.room <= 1}
                        className="optionCounterButton w-8 h-8 border-2 border-blue-500 text-blue-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={() => handleOption("room", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.room}
                      </span>
                      <button
                        className="optionCounterButton w-8 h-8 border-2 border-blue-500 text-blue-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={() => handleOption("room", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* button */}
            <div className="headerSearchItem flex items-center gap-5">
              <button
                onClick={handleSearch}
                className="headerBtn p-2 rounded-md bg-yellow-500"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
