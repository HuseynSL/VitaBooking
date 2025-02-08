import Hotel from "../models/hotel.js";
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
export const getHotel=async (req,res,next)=>{
    try {
          const hotels=await Hotel.find()
          console.log(hotels)
          res.status(200).json(hotels)
        } catch (error) {
       next(error)
     }
};
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