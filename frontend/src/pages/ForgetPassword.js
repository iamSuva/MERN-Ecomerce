import React, { useState } from "react";
import Layout from "../components/layout/Layout.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
        newpassword,
      };
      if (newpassword != confirmpassword) {
        toast.error("confirm password does not mathched");
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/forgetPassword`,
          data
        );
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      <div className="signup">
        <h2>Change Password </h2>

        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter new  password"
              value={newpassword}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="confirm new  password"
              value={confirmpassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="btn btn-info"
            onClick={() => navigate("/forgetPassword")}
          >
            Forget Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
