import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import MailInput from "../../../components/MailInput/MailInput";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import url from "../../../utils/baseUrl";
import { SearchContext } from "../../../context/SearchContext";
import { AuthContext } from "../../../context/AuthContext";
import Reservation from "../../../components/Reservation/Reservation";

const Hotel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal,setOpenModal]=useState(false)

  const { data, loading, error } = useFetch(`${url}/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  

  const {date,options}=useContext(SearchContext)
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
      if (!date1 || !date2) return 0;
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    }
  
  const days = date?.length > 0 ? dayDifference(date[0]?.endDate, date[0]?.startDate) : 1;
    
  

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick=()=>{
    if (user) {
      setOpenModal(true)
    } else {
      navigate("/login")
    }
  }

  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer flex flex-col items-center mt-5">
          {open && (
            <div className="slider sticky top-0 right-0 w-screen h-screen bg-black bg-opacity-60 z-50 flex items-center">
              <IoIosCloseCircleOutline
                className="close absolute top-[20px] right-[20px] cursor-pointer text-3xl"
                onClick={() => setOpen(false)}
              />
              <FaArrowLeftLong
                className="arrow m-5 text-3xl text-black cursor-pointer"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper w-full h-full flex justify-center items-center">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg w-4/5 h-[80vh]"
                />
              </div>
              <FaArrowRightLong
                className="arrow m-5 text-3xl text-black cursor-pointer"
                onClick={() => handleMove("r")}
              />
            </div>
          )}

          <div className="hotelWrapper w-full max-w-5xl flex flex-col gap-3 relative">
            <button className="bookNow hidden absolute top-[10px] right-0 py-3 px-8 bg-blue-500 text-white font-bold rounded-sm cursor-pointer md:block">
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle text-xl">{data.name}</h1>
            <div className="hotelAddress text-xs flex items-center gap-3">
              <IoLocationSharp />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance text-blue-500 font-bold">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight text-green-500 font-bold">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>

            <div className="hotelImages grid px-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-2 justify-between">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper " key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg w-full object-cover cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="hotelDetails px-4 grid grid-cols-1 justify-between gap-5 mt-5 md:grid-cols-2 lg:grid-cols-3">
              <div className="hotelDetailsTexts col-span-2">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc font-sm mt-5">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice bg-yellow-500 flex flex-col gap-5 p-5">
                <h1 className="text-lg text-gray-500">
                  Perfect for a {days}-night stay!
                </h1>
                <span className="text-sm">
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2 className="font-md">
                  <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                </h2>
                <button onClick={handleClick} className="py-3 px-5 text-white bg-blue-500 font-bold cursor-pointer rounded-md">
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MailInput />
      {openModal && <Reservation setOpen={setOpenModal} hotelId={id}/>}
    </div>
  );
};

export default Hotel;
