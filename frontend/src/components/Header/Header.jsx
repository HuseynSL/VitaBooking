import React, { useContext, useState } from "react";
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
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
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

  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <>
      <div className="header w-full bg-[#1C0F5E]">
        <div className={style.container}>
          <div className="headerList flex justify-center gap-5 text-white md:justify-start">
            <div className="headerListItem flex gap-1 border-2 rounded-full p-1 text-md md:gap-2 p-2">
              <span className="pt-1">
                <IoBed />
              </span>
              <span>Stays</span>
            </div>
            <div className="headerListItem flex gap-2 py-2 text-md">
              <span className="pt-1">
                <MdFlightTakeoff />
              </span>
              <span>Flight</span>
            </div>
            <div className="headerListItem flex gap-2 py-2 text-md">
              <span className="pt-1">
                <FaCar />
              </span>
              <span>Car</span>
            </div>
            <div className="headerListItem flex gap-2 py-2 text-md">
              <span className="pt-1">
                <MdAttractions />
              </span>
              <span>Attractions</span>
            </div>
            {/* <div className="headerListItem flex gap-2 py-2 text-md">
              <span className="pt-1">
                <BsFillTaxiFrontFill />
              </span>
              <span>Airport Taxis</span>
            </div> */}
          </div>

          <div className="headerContent flex py-8 flex-col gap-5 text-white md:py-16">
            <h1 className="font-bold text-3xl md:text-5xl">
              Find your next stay
            </h1>
            <p className="text-lg md:text-2xl">
              Search low prices on hotels, homes and much more...
            </p>
          </div>

          <div className="headerSearch w-full  grid grid-cols-1 py-1 bottom-[-80px] gap-0 md:grid-cols-4 gap-4 py-4 px-4 rounded-xl absolute bg-white border-2 border-blue-500 bottom-[-34px] shadow-lg">
            {/* Search */}
            <div className="headerSearchItem flex items-center gap-3 w-full border-2 border-yellow-500 px-2 rounded-md bg-gray-100 md:px-3 py-2">
              <IoIosBed className="text-blue-500 text-xl" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Datesss */}
            <div className="headerSearchItem relative flex items-center gap-3 w-full border-2 border-yellow-500 px-3 py-2 rounded-md bg-gray-100 cursor-pointer">
              <FaCalendarAlt className="text-blue-500 text-xl" />
              <span
                onClick={() => setOpenDate(!openDate)}
                className="text-gray-600"
              >
                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
              {openDate && (
                <div className="absolute top-[50px] left-0 z-20 bg-white shadow-md p-4 border rounded-md">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    minDate={new Date()}
                  />
                </div>
              )}
            </div>

            {/* People */}
            <div className="headerSearchItem relative flex items-center gap-3 w-full border-2 border-yellow-500 px-3 py-2 rounded-md bg-gray-100 cursor-pointer">
              <IoPersonOutline className="text-blue-500 text-xl" />
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="text-gray-600"
              >
                {`${options.adult} Adult · ${options.children} Children · ${options.room} Room`}
              </span>
              {openOptions && (
                <div className="absolute top-[50px] left-0 right-0 z-20 bg-white shadow-md border rounded-md p-4">
                  {["adult", "children", "room"].map((type) => (
                    <div
                      key={type}
                      className="flex justify-between items-center my-2"
                    >
                      <span className="capitalize">{type}</span>
                      <div className="flex items-center gap-3">
                        <button
                          disabled={options[type] <= (type === "adult" ? 1 : 0)}
                          className="w-8 h-8 border-2 border-blue-500 text-blue-500 rounded-md disabled:bg-gray-300"
                          onClick={() => handleOption(type, "d")}
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{options[type]}</span>
                        <button
                          className="w-8 h-8 border-2 border-blue-500 text-blue-500 rounded-md"
                          onClick={() => handleOption(type, "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttonss */}
            <div className="headerSearchItem flex justify-center w-full">
              <button
                onClick={handleSearch}
                className="w-full md:w-auto px-6 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
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
