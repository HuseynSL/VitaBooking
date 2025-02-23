import React from "react";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import url from "../../utils/baseUrl.js";

const Reservation = ({ setOpen, hotelId }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : "";
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`${url}/hotels/room/${hotelId}`);
  const { date: dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      const reservations = await Promise.all(
        selectedRooms.map(async (roomId) => {
          const roomData = data
            .flatMap((item) => item.roomNumbers)
            .find((room) => room._id === roomId);
  
          if (!roomData) {
            console.error(`Room not found for ID: ${roomId}`);
            return null; 
          }
  
          const roomNumber = roomData.number;
  
          const res = await axios.post(`${url}/reservations`, {
            userId: userId, 
            hotelId: hotelId,
            roomId: roomId,
            roomNumber: roomNumber,
            startDate: alldates[0],
            endDate: alldates[alldates.length - 1],
          });
  
          return res.data;
        })
      );
  
     
      const successfulReservations = reservations.filter((res) => res !== null);
  
      if (successfulReservations.length > 0) {
        setOpen(false);
        navigate("/");
      } else {
        console.error("No reservations were successfully made.");
      }
    } catch (err) {
      console.error("Error making reservation:", err);
    }
  };

  return (
    <div className="reserve w-full h-full fixed top-0 left-0 bg-black/50 flex items-center justify-center z-50">
      <div className="rContainer bg-white rounded-lg shadow-2xl p-6 w-full max-w-3xl relative">
        <ImCancelCircle
          className="rClose absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-600 cursor-pointer transition duration-300"
          onClick={() => setOpen(false)}
        />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Your Rooms</h2>
        {data.map((item) => (
          <div className="rItem bg-gray-50 rounded-lg p-4 mb-4 shadow-sm" key={item._id}>
            <div className="rItemInfo flex flex-col gap-2">
              <div className="rTitle text-lg font-semibold text-gray-800">{item.title}</div>
              <div className="rDesc text-sm text-gray-600">{item.desc}</div>
              <div className="rMax text-sm text-gray-700">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice text-lg font-bold text-blue-600">${item.price}</div>
            </div>
            <div className="rSelectRooms flex flex-wrap gap-3 mt-3">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room flex flex-col items-center" key={roomNumber._id}>
                  <label className="text-sm text-gray-700">{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                    className="w-5 h-5 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleClick}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reservation;