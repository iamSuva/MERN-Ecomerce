import Layout from "../components/layout/Layout";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContex";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  //total price of cart
  const calculateTotalPrice = () => {
    let total = 0;
    carts?.forEach((prod) =>
       total = total + prod.price*prod.quantity
  );
    return total;
  };
  
  const removeCartItem = (pid) => {
    try {
      const mycart = [...carts];
      const ind = mycart.findIndex((p) => p._id == pid);
      mycart.splice(ind, 1);
      localStorage.setItem("carts", JSON.stringify(mycart));
      setCarts(mycart);
    } catch (error) {}
  };
 const handleIncrement=(product)=>{
  const newprod={...product,quantity:product.quantity+1};
  const updatedCarts=carts.map((prod)=>{
    if(prod._id==product._id)
      {
        return {...prod,quantity:prod.quantity+1};
      }
      return prod;
  });
 console.log(updatedCarts);
  setCarts(updatedCarts)
  localStorage.setItem("carts",JSON.stringify(updatedCarts));
 }
 const handleDecrement=(product)=>{
  console.log("prod",product);
  // const newprod={...product,quantity:product.quantity+1};
  const updatedCarts=carts.map((prod)=>{
    if(prod._id==product._id)
      {
        return {...prod,quantity:prod.quantity>1?product.quantity-1:product.quantity};
      }
      return prod;
  });
 console.log(updatedCarts);
  setCarts(updatedCarts)
  localStorage.setItem("carts",JSON.stringify(updatedCarts));
 }


  return (
    <Layout title="Cart-page">
      <h1 className="text-center">Welcome to cart page</h1>
      <div className="row">
        {/* <h2 className="">
          {carts && carts.length > 0
            ? `You have ${carts.length} items in cart`
            : "Cart is empty"}
        </h2> */}

        <div className="col-md-9">
          { carts && carts.map((product) => (
            <div className="row m-1 p-3 card flex-row">
              <div className="col-md-8 ">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${product.productImage}`}
                  class="card-img-top"
                  alt="product image"
                  style={{ width: "150px", height: "120px" }}
                />
              </div>
              <div className="col-md-4">
                <p>{product.name}</p>
                <p>RS:- {product.price}/-</p>
                <p>Quantity:{product.quantity}</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => removeCartItem(product._id)}
                >
                  Remove
                </button>
                <button className="btn btn-info m-2" onClick={()=>handleIncrement(product)}>+</button>
               {product.quantity>1 && <button className="btn btn-info m-2" onClick={()=>handleDecrement(product)}>-</button>
            }
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-3">
          {carts?.length > 0 ? (
            <>
              <h2>Your cart Summary</h2>
              <hr />
              <h4>Total cart price :Rs- {calculateTotalPrice()} /-</h4>

              {auth.token && (
                <button
                  className="btn btn-info"
                  onClick={() => navigate("/dashboard/user/checkout")}
                >
                  Make Payment
                </button>
              )}
            </>
          ) : (
            <h1>Cart is empty add some products</h1>
          )}
          {!auth.token && (
            <button className="btn btn-info" onClick={() => navigate("/login")}>
              Please login to Checkout
            </button>
          )}

         
        </div>
      </div>
    </Layout>
  );
};

export default Cartpage;
