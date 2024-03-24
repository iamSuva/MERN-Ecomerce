import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
const Spinner = ({path="login"}) => {
    const [count,setCount]=useState(3);
    const navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        const interval=setInterval(()=>{
             setCount(prev=>prev-1);
        },1000)
        if(count==0)
        {
          console.log(` redirect path => /${path}`);
            clearInterval(interval);
            navigate(`/${path}`,{state:location.pathname}); //used at login to go back to prev state where from login called
        }
    },[count,navigate,path])
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"50vh"}}>
        <h1>Trying to get within {count}</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
