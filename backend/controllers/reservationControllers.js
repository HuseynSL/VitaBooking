import Reservation from "../models/reservation.js";
import Room from "../models/rooms.js";


export const createReservation = async (req, res) => {
  const { userId, hotelId, roomId, roomNumber, startDate, endDate } = req.body;

  try {

    const newReservation = new Reservation({
      userId,
      hotelId,
      roomId,
      roomNumber,
      startDate,
      endDate,
    });


    await newReservation.save();


    const room = await Room.findOne({ "roomNumbers.number": roomNumber });
    if (room) {

      const roomToUpdate = room.roomNumbers.find(
        (room) => room.number === roomNumber
      );
      roomToUpdate.unavailableDates.push(...getDatesInRange(startDate, endDate));


      await room.save();
    }

    res.status(201).json({
      message: "Reservation created successfully",
      reservation: newReservation,
    });
  } catch (err) {
    console.error("Error creating reservation:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = [];

  while (start <= end) {
    dates.push(new Date(start).getTime());
    start.setDate(start.getDate() + 1);
  }

  return dates;
};

export const getUserReservations = async (req, res) => {
  const { userId } = req.params;

  try {

    const reservations = await Reservation.find({ userId }).populate("hotelId");

    if (!reservations.length) {
      return res.status(404).json({ message: "No reservations found" });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;
    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    console.log("Found Reservation:", reservation);


    const room = await Room.findOne({ "roomNumbers.number": reservation.roomNumber });

    if (!room) {
      return res.status(404).json({ message: "Room not found for the given number" });
    }

    console.log("Found Room Before Update:", JSON.stringify(room, null, 2));


    room.roomNumbers = room.roomNumbers.map((roomNum) => {
      if (roomNum.number === parseInt(reservation.roomNumber)) {
        console.log("Before Update Unavailable Dates:", roomNum.unavailableDates);

        const updatedUnavailableDates = roomNum.unavailableDates.filter(
          (date) =>
            new Date(date).getTime() < new Date(reservation.startDate).getTime() ||
            new Date(date).getTime() > new Date(reservation.endDate).getTime()
        );

        console.log("After Update Unavailable Dates:", updatedUnavailableDates);

        return { ...roomNum, unavailableDates: updatedUnavailableDates };
      }
      return roomNum;
    });


    await room.save();
    console.log("Room After Update:", JSON.stringify(await Room.findById(room._id), null, 2));


    await Reservation.findByIdAndDelete(reservationId);
    console.log("Reservation Deleted Successfully");

    res.status(200).json({ message: "Reservation cancelled successfully and room updated" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("userId", "username email") 
      .populate("hotelId", "name location") 
      .sort({ startDate: -1 }); 

    if (!reservations.length) {
      return res.status(404).json({ message: "No reservations found" });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching all reservations:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};