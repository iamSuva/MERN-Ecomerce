import express from "express";
import {checkAuth, forgetPassword, loginController, signUpController, updateProfileController } from "../controllers/authController.js";
import { isAdmin, requireSign } from "../middleware/authorization.js";
 
const router=express.Router();

router.post("/signup",signUpController);
router.post("/login",loginController);

router.get("/test",requireSign,isAdmin,checkAuth);
//checking authenticated user
router.get("/userAuth",requireSign,(req,res)=>{
    return res.status(200).send({ok:true});
})
//checking admin
router.get("/adminAuth",requireSign,isAdmin,(req,res)=>{
    return res.status(200).send({ok:true});
})
router.post("/forgetPassword",forgetPassword);

//update profile
router.put("/profile",updateProfileController);

export default router;