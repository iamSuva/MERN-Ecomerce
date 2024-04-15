import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
const Signup = () => {
    
const [username,setUsername]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const navigate=useNavigate();

const {auth}=useAuth();
useEffect(()=>{
  if(auth.token)
  {
    navigate("/");
  }
},[auth?.token])



 const handleSubmit=async(e)=>{
    e.preventDefault();
    
    
    try {
        const userData={
            username,
            email,
            password
        };
        console.log(userData);
        console.log(`${process.env.REACT_APP_API_URL}`);
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`,userData);
        console.log(response.data);
        if(response.data.success)
        { 
        console.log(response.data.message);
        toast.success("successful sign up");
        
        navigate("/login");

        }
        else{
            toast.error(response.data.message);

        }
    
    } catch (error) {
        console.log(error);
        toast.error("something wrong!")
    }
 }

  return (
    <Layout title="BuYsite-Signup">
      <div className="login-register">
        <h2 >Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
          
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter user Fullname"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
            />
           </div>
          <div className="mb-3">
          
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required

            />
           </div>
          <div className="mb-3">
          
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
         
          <button type="submit" className="btn btn-primary">
            SignUp
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
