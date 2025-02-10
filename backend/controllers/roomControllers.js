import Room from "../models/rooms.js"
import {createError} from "../utils/error.js"
import Hotel from "../models/hotel.js"




//POST
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
  
    try {
      const savedRoom = await newRoom.save();
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedRoom);
    } catch (err) {
      next(err);
    }
  };


//GET ALL HOTELS
export const getRoom = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        console.log(rooms)
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
};
// SELECTED HOTELS
export const getByIdRoom = async (req, res, next) => {
    try {
        const selectedRoom = await Room.findById(req.params.id)
        res.status(200).json(selectedRoom)
    } catch (error) {
        next(error)
    }
};
//DELETE
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
              $pull: { rooms: req.params.id },
            });
          } catch (err) {
            next(err);
          }
    } catch (error) {
        next(error)
    }
};

//UPDATED 
export const updateRoom = async (req, res) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateRoom)
    } catch (error) {
        next(error)
    }
};