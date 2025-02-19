import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../utils/baseUrl.js";

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
        setError("Error fetching reservations.");
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
      
      
      setReservations(reservations.filter(res => res._id !== reservationId));
    } catch (error) {
      setError("Error canceling reservation.");
      console.error("Error canceling reservation:", error);
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-content">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">My Reservations</h1>
    
    {error && (
      <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-6">{error}</p>
    )}
  
    {loading ? (
      <p className="text-gray-600 italic">Processing...</p>
    ) : reservations.length > 0 ? (
      <ul className="space-y-4">
        {reservations.map((reservation) => (
          <li
            key={reservation._id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <p className="text-lg font-semibold text-gray-700">
              Hotel: <span className="text-gray-900">{reservation.hotelId.name}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Room: <span className="text-gray-900">{reservation.roomNumber}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              From: <span className="text-gray-900">
                {new Date(reservation.startDate).toLocaleDateString()}
              </span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              To: <span className="text-gray-900">
                {new Date(reservation.endDate).toLocaleDateString()}
              </span>
            </p>
            <button
              onClick={() => handleCancelReservation(reservation._id)}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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
