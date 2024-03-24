import Layout from "../components/layout/Layout";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContex";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
const Cartpage = () => {
  const { auth } = useAuth();
  const { carts, setCarts } = useCart();
  //for payment
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //total price of cart
  const calculateTotalPrice = () => {
    let total = 0;
    carts?.map((prod) => (total = total + prod.price));
    return total;
  };
  //get payment token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/braintree/token`
      );

      console.log("client ",data);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  //
  const removeCartItem = (pid) => {
    try {
      const mycart = [...carts];
      const ind = mycart.findIndex((p) => p._id == pid);
      mycart.splice(ind, 1);
      localStorage.setItem("carts", JSON.stringify(mycart));
      setCarts(mycart);
    } catch (error) {}
  };

  const handlePayment = () => {
    console.log("pay req ");
    console.log("toek",clientToken);
  };

  return (
    <Layout title="Cart-page">
      <h1>Welcome to cart page</h1>
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center bg-light">
            {auth?.token ? `Hello ${auth.user.username}` : "Please login"}
          </h1>
          <h2 className="text-cente">
            {carts.length > 0
              ? `You have ${carts.length} items in cart`
              : "Cart is empty"}
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {carts.map((product) => (
            <div className="row m-3 p-3 card flex-row">
              <div className="col-md-8 ">
                <img
                  src={`${process.env.REACT_APP_API_URL}/api/product/get-productImage/${product._id}`}
                  class="card-img-top"
                  alt="product image"
                  style={{ width: "150px", height: "120px" }}
                />
              </div>
              <div className="col-md-4">
                <p>{product.name}</p>
                <p>RS:-{product.price}/-</p>

                <button
                  className="btn btn-danger"
                  onClick={() => removeCartItem(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-3">
          <h2>Your cart Summary</h2>
          {carts.length > 0 ? (
            <>
              <hr />
              <h4>Total cart price :Rs- {calculateTotalPrice()} /-</h4>
            </>
          ) : (
            <h1>Cart is empty</h1>
          )}
          <div className="mt-2">
            <DropIn
              options={{
                authorization: clientToken,
                paypal:{
                  flow: "vault",
                }
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button className="btn btn-primary" onClick={()=>navigate("/dashboard/user/checkout")}>
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cartpage;
