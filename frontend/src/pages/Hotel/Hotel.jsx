import React, { useState } from "react";
import style from "./style.module.css";
import { useLocation } from "react-router-dom";
import MailInput from "../../components/MailInput/MailInput";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import useFetch from "../../hooks/useFetch";
import url from "../../utils/baseUrl";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch(`${url}/hotels/find/${id}`);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

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

  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer flex flex-col items-center mt-5">
          {open && (
            <div className="slider sticky top-0 right-0 w-screen h-screen bg-black bg-opacity-60 z-50 flex items-center">
              <IoIosCloseCircleOutline
                // icon={faCircleXmark}
                className="close absolute top-[20px] right-[20px] cursor-pointer text-3xl"
                onClick={() => setOpen(false)}
              />
              <FaArrowLeftLong
                // icon={faCircleArrowLeft}
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
                // icon={faCircleArrowRight}
                className="arrow m-5 text-3xl text-black cursor-pointer"
                onClick={() => handleMove("r")}
              />
            </div>
          )}

          <div className="hotelWrapper w-full max-w-5xl flex flex-col gap-3 relative">
            <button className="bookNow absolute top-[10px] right-0 py-3 px-5 bg-blue-500 text-white font-bold rounded-sm cursor-pointer">
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

            <div className="hotelImages grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 gap-2 justify-between">
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

            <div className="hotelDetails grid grid-cols-3 justify-between gap-5 mt-5">
              <div className="hotelDetailsTexts col-span-2">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc font-sm mt-5">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice bg-yellow-500 flex flex-col gap-5 p-5">
                <h1 className="text-lg text-gray-500">
                  Perfect for a 9-night stay!
                </h1>
                <span className="text-sm">
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2 className="font-md">
                  <b>$945</b> (9 nights)
                </h2>
                <button className="py-3 px-5 text-white bg-blue-500 font-bold cursor-pointer rounded-md">
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MailInput />
    </div>
  );
};

export default Hotel;
