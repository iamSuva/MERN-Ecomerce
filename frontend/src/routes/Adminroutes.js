import React, { useState, useEffect } from "react";

import axios from "axios";
import { useAuth } from "../context/authContext";

import Spinner from "../components/layout/Spinner";
import { Outlet } from "react-router-dom";

const Adminroutes = () => {
    console.log("private routes");
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/auth/adminAuth`,
            { headers: { Authorization: `Bearer ${auth?.token}` } }
          );
          console.log("response", response);
          if (response.data.ok) {
            setOk(true);
          }else{
            setOk(false);
          }
      } catch (error) {
        setOk(false);
      }
    };
    if (auth?.token) {
      checkAuth();
    }
  }, [auth?.token]);

  return ok ? <Outlet/> : <Spinner  />;
};

export default Adminroutes;
