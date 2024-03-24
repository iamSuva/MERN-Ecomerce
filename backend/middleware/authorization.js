import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const requireSign=async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization;
        console.log("header ",authHeader);
        if(!authHeader || !authHeader.startsWith("Bearer"))
        {
            return res.status(401).send({message:"Unauthorized "});
        }
        const token = authHeader.split(" ")[1];
        console.log("token ",token);
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decodedToken);
        if (!decodedToken) {
            return res.status(401).send({ message: "invalid token user access" });
        }

        // Attach the decoded token to the request object for later use if needed
        req.user = decodedToken;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error" });
  
    }
}

//check if admin or not
export const isAdmin=async(req,res,next)=>{
    try {
        const user=await userModel.findById(req.user._id);
        console.log(user);
        if(user.role!=="admin")//user not as admin
        {
          return  res.status(401).send({message:"unauthorized access user/admin"});
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error" });
  
    }
}