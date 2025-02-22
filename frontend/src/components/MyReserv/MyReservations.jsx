import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../utils/baseUrl.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const MyReservations = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${url}/reservations/user/${userId}`);
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [userId]);

  const handleCancelReservation = async (reservationId) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${url}/reservations/${reservationId}`);

      setReservations(reservations.filter((res) => res._id !== reservationId));
    } catch (error) {
      setError("Error canceling reservation.");
      console.error("Error canceling reservation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Reservations</h1>
  
      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-6">{error}</p>
      )}
  
      {loading ? (
        <p className="text-gray-600 italic">Processing...</p>
      ) : reservations.length > 0 ? (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-1 lg:grid-cols-3">
          {reservations.map((reservation) => (
            <li
              key={reservation._id}
              className="p-6 bg-white rounded-lg w-96 shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Swiper Slider */}
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="h-full"
                >
                  {reservation.hotelId?.photos?.map((photo, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={photo || "https://via.placeholder.com/400"}
                        alt={`${reservation.hotelId?.name} - Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
  
              {/* Otel Bilgileri */}
              <div className="space-y-2">
                <p className="text-xl font-bold text-gray-800">
                  {reservation.hotelId?.name || "Unknown Hotel"}
                </p>
                <p className="text-gray-600 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {reservation.hotelId?.rating || "N/A"}
                </p>
                <p className="text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block mr-2 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {reservation.hotelId?.address || "No address available"}
                </p>
              </div>
  
              {/* Rezervasyon Detayları */}
              <div className="mt-4 border-t pt-4">
                <p className="text-lg font-semibold text-gray-700">
                  Room:{" "}
                  <span className="text-gray-900">{reservation.roomNumber}</span>
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  From:{" "}
                  <span className="text-gray-900">
                    {new Date(reservation.startDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  To:{" "}
                  <span className="text-gray-900">
                    {new Date(reservation.endDate).toLocaleDateString()}
                  </span>
                </p>
              </div>
  
              {/* İptal Butonu */}
              <button
                onClick={() => handleCancelReservation(reservation._id)}
                className="mt-4 w-full px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancel Reservation
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 italic">No reservations found</p>
      )}
    </div>
  );
};

export default MyReservations;
