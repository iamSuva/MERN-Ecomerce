import React, { useState, useEffect } from "react";

import axios from "axios";
import { useAuth } from "../context/authContext";

import Spinner from "../components/layout/Spinner";
import { Outlet } from "react-router-dom";

const Userroutes = () => {
    console.log("private routes");
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/userAuth`,
         { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      console.log("authentication", response);
      if (response.data.ok) {
        setOk(true);
      }else{
        setOk(false);
      }
    };
    if (auth?.token) {
      checkAuth();
    }
  }, [auth?.token]);
  return ok ? <Outlet/> : <Spinner/>;
};

export default Userroutes;
