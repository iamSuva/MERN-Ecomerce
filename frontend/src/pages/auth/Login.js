import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";


const Login= () => {
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const navigate=useNavigate();
const location=useLocation();
 const {auth,setAuth}=useAuth();
 const handleSubmit=async(e)=>{
    e.preventDefault();
      
    try {
        const userData={
            email,
            password
        };
        console.log(userData);
        console.log(`${process.env.REACT_APP_API_URL}`);
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`,userData);
        console.log(response.data);
        if(response.data.success)
        { 
        console.log(response.data.message);
        toast.success(response.data.message);
        setAuth({
          ...auth,
          user:response.data.user,
          token:response.data.token
        })

      //set user in localstorage
      localStorage.setItem("loginUser",JSON.stringify(response.data));

        setTimeout(()=>{
          navigate(location.state || "/");

        },1000)

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
      <div className="signup">
        <h2 >Login </h2>
        
        <form onSubmit={handleSubmit} className="d-flex flex-column">
         
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
           <div className="mb-3">

          <button type="submit" className="btn btn-primary">
           Login
          </button>
           </div>
          <button  className="btn btn-info" onClick={()=>navigate("/forgetPassword")}>
            Forget Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
