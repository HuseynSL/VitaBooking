import express from "express"
import { deleteuser,getByIduser,getuser,updateuser } from "../controllers/userControllers.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"
import user from "../models/user.js"
const router = express.Router()


//GET CHECK
router.get("/checkauth", verifyToken, (req, res, next) => {
    return res.status(200).json({ message: "You are logged in" });
})
//CHECK USER
router.get("/checkuser/:id",verifyUser, (req, res, next) => {
    res.send( "You are logged in and you can delete your account" );
});
//CHECK ADMIN
router.get("/checkadmin/:id",verifyAdmin, (req, res, next) => {
    res.send( "ADMIN, You are logged in and you can delete all account" );
});
// UPDATE
router.put("/:id",verifyUser,updateuser)
// DELETE
router.delete("/:id",verifyUser,deleteuser)
// GETByID
router.get("/:id",verifyUser,getByIduser)
// GETALL
router.get("/", verifyAdmin, async (req, res, next) => {
    try {
        const users = await user.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});
  


export default router