import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContex";
import axios from "axios";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/authContext";

const CheckoutPage = () => {
  const { auth } = useAuth(); // Assuming useAuth hook is available for authentication
  const { carts } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    mobileNumber: "",
    city: "",
    postalCode: "",
    streetAddress: "",
  });
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total amount when the component mounts or when the carts change
    const calculateTotalAmount = () => {
      let total = 0;
      carts.forEach((product) => {
        total += product.price * product.quantity;
      });
      setTotalAmount(total);
    };
    calculateTotalAmount();
  }, [carts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save order data to the database
      const orderData = {
        products: carts.map((product) => product._id),

        payment: {
          totalAmount,
        },
        customer: auth.user._id, // Using customer ID from authentication
        userName: formData.userName,
        mobileNumber: formData.mobileNumber,
        city: formData.city,
        postalCode: formData.postalCode,
        streetAddress: formData.streetAddress,
      };

      // Make a POST request to save the order data
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/product/placeOrder`,
        orderData
      );
      if (response.data.success) {
        console.log("Order placed successfully:", response.data);
        navigate("/dashboard/user/order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="mt-3 text-center">Checkout</h2>
        <div className="mt-3 row">
          <div className="col-md-3">
            <h3>Cart Products:</h3>
            {carts.map((product) => (
              <div key={product._id}>
                <p>
                  {product.name} - Rs {product.price}
                </p>
              </div>
            ))}
            <div className="mt-3">
              <h3>Total Amount: Rs {totalAmount}</h3>
            </div>
          </div>
          <div className="col-md-8">
            <form onSubmit={handleSubmit} className="mt-3 checkout-form">
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                  Mobile Number:
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City:
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">
                  PIN code:
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="streetAddress" className="form-label">
                  Street Address:
                </label>
                <textarea
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Place order
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
