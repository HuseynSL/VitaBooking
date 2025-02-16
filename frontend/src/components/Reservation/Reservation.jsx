import React from 'react'
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import url from "../../utils/baseUrl.js"


const Reservation = ({setOpen,hotelId}) => {

    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`${url}/hotels/room/${hotelId}`);
    const { date:dates } = useContext(SearchContext);
  
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
  
    const navigate = useNavigate();
  
    const handleClick = async () => {
      try {
        await Promise.all(
          selectedRooms.map((roomId) => {
            const res = axios.put(`/rooms/availability/${roomId}`, {
              dates: alldates,
            });
            return res.data;
          })
        );
        setOpen(false);
        navigate("/");
      } catch (err) {}
    };


  return (
    <div className="reserve w-full h-full fixed top-[0px] left-[0px] flex items-center justify-center">
      <div className="rContainer bg-white p-5 relative">
        <ImCancelCircle 
          className="rClose absolute top-0 right-0 cursor-pointer"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem flex items-center gap-12 p-5" key={item._id}>
            <div className="rItemInfo flex flex-col gap-1">
              <div className="rTitle font-md">{item.title}</div>
              <div className="rDesc font-light">{item.desc}</div>
              <div className="rMax text-sm">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice font-md">{item.price}</div>
            </div>
            <div className="rSelectRooms flex flex-wrap gap-1 text-xs text-gray">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room flex flex-col">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  )
}

export default Reservation
