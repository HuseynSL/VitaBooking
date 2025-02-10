import user from "../models/user.js";
//GET ALL userS
export const getuser=async (req,res,next)=>{
    try {
          const users=await user.find()
          console.log(users)
          res.status(200).json(users)
        } catch (error) {
       next(error)
     }
};
// SELECTED userS
export const getByIduser=async (req,res,next)=>{
    try {
      const selecteduser=await user.findById(req.params.id)
      res.status(200).json(selecteduser)
    } catch (error) {
       next(error)
     }
};
//DELETE
export const deleteuser= async (req,res,next)=>{
    try {
      await user.findByIdAndDelete(req.params.id)
      res.status(200).json("user has been deleted")
    } catch (error) {
       next(error)
     }
};
//UPDATED 
export const updateuser=async (req,res)=>{
    try {
      const updateuser=await user.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
      res.status(200).json(updateuser)
    } catch (error) {
       next(error)
     }
};