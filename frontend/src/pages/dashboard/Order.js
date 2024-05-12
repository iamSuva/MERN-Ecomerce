import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import Spinner from "../../components/layout/Spinner";
import Usersidebar from "../../components/layout/Usersidebar";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/product/get-orders`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        console.log("response orders ", response.data);
        if (response.data.success) {
          console.log("Order placed successfully:", response.data);
          setOrders(response.data.orders);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="row ">
        <div className="col-md-3">
          <Usersidebar/>
        </div>
        <div className="col-md-8 mr-md-3">
          <h1>All orders</h1>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Products</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Date</th> 
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      <ul>
                        {order.products.map((product) => (
                          <li key={product._id}>
                            {product.name} - RS:{product.price} 
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{order.payment.totalAmount}</td>
                    <td>{order.status}</td>
                    
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                     
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
