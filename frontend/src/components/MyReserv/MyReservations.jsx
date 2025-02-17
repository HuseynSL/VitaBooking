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
    <div>
      <h1>My Reservations</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} 
      {loading ? (
        <p>Processing...</p>  
      ) : reservations.length   ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id}>
              <p>Hotel: {reservation.hotelId.name}</p>
              <p>Room: {reservation.roomNumber}</p>
              <p>From: {new Date(reservation.startDate).toLocaleDateString()}</p>
              <p>To: {new Date(reservation.endDate).toLocaleDateString()}</p>
              <button onClick={() => handleCancelReservation(reservation._id)}>
                Cancel Reservation
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations found</p>
      )}
    </div>
  );
};

export default MyReservations;
