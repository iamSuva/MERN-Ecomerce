import { comparePassword, createHashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const signUpController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validate
    if (!username || !email || !password) {
      res.status(422).send({ message: "Some fields are empty" });
    }
    //existing user
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res
        .status(200)
        .send({ success: false, message: "Already resgisted please login " });
    }
    const hashedPassword = await createHashPassword(password);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      return res.status(200).send({
        success: true,
        message: "Sign up successful",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//post login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "Some filed are missing" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not found",
      });
    }
    const isPassword = await comparePassword(password, user.password);
    if (!isPassword) {
      return res.status(200).send({
        success: false,
        message: "Password is invalid",
      });
    }
    //generate token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        role:user.role,
        _id:user._id
        
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in login", error });
  }
};

//password change
export const forgetPassword = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    if (!email || !newpassword) {
      return res.status(400).send({ message: "Some fields are empty" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not found",
      });
    }
    const hashedPassword = await createHashPassword(newpassword);
    const updatedUser = await userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    return res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in password change",
      error,
    });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.send("protected routes");
  } catch (error) {
    res.send(error);
  }
};


export const updateProfileController=async(req,res)=>{
  try {
    const {username,email,password}=req.body;
    console.log(req.user);
    const user = await userModel.findOne({ email });
    let newpassword;
    if(password)
    {
      newpassword=await createHashPassword(password);
    }
    else{
      newpassword=user.password;
    }
    const updated=await userModel.findByIdAndUpdate(user._id,{
       username:username || user.username,
       email:user.email,
        password:newpassword
    },{new:true});
    return res.status(200).send({
      success:true,
      message:"user profile updated",
      updated
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in password change",
      error,
    });
  }


}