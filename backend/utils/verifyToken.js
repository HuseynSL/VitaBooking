import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken=(req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticated"))
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if (err) {
            return next(createError(403,"Token isn`t valid"));
        }
        req.user=user;
        next()
    })
}



export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"you are not auth"));
        }
    })
}


export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"you are not admin"));
        }
    })
}