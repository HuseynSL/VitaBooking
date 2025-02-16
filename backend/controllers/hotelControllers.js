import Hotel from "../models/hotel.js";
import Room from "../models/rooms.js";

// POST
export const postHotel=async (req,res,next)=>{
     const newHotel=new Hotel(req.body)
      try {
        const postHotel=await newHotel.save()
        res.status(200).json(postHotel)
      } catch (error) {
        next(error)
      }
};
//GET ALL HOTELS


export const getHotel = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(Number(limit) || 0);  

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


// export const getHotel = async (req, res, next) => {
//   const { min, max, featured, ...others } = req.query;
//   try {
//     const query = {
//       ...others,
//       cheapestPrice: { $gt: Number(min) || 1, $lt: Number(max) || 999 },
//     };

  
//     if (featured !== undefined) {
//       query.featured = featured === "true"; 
//     }

//     const hotels = await Hotel.find(query).limit(Number(req.query.limit) || 10);
//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }
// };


// SELECTED HOTELS
export const getByIdHotel=async (req,res,next)=>{
    try {
      const selectedHotel=await Hotel.findById(req.params.id)
      res.status(200).json(selectedHotel)
    } catch (error) {
       next(error)
     }
};
//DELETE
export const deleteHotel= async (req,res,next)=>{
    try {
      await Hotel.findByIdAndDelete(req.params.id)
      res.status(200).json("Hotel has been deleted")
    } catch (error) {
       next(error)
     }
};
//UPDATED 
export const updateHotel=async (req,res)=>{
    try {
      const updateHotel=await Hotel.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
      res.status(200).json(updateHotel)
    } catch (error) {
       next(error)
     }
};
// COUNT BY CITY
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
// COUNT BY TYPE
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// for reservation
export const getHotelRooms = async (req, res, next) => {
  try {
    const id = req.params.id
    const hotel = await Hotel.findById(id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};